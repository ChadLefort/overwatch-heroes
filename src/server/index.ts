import * as bodyParser from 'body-parser';
import { handlebars } from 'consolidate';
import * as express from 'express';
import { registerControllers } from 'giuseppe';
import * as path from 'path';
import * as serveFavicon from 'serve-favicon';
import { getConnectionManager } from 'typeorm';
import './controllers/controllers';
import { Hero } from './models/hero';

const app = express();

app.engine('hbs', handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(serveFavicon(path.join(__dirname, '../public/assets/logo.png')));

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const devServer = require('webpack-dev-middleware');
    const hotServer = require('webpack-hot-middleware');
    const webpackConfig = require('../../webpack.config.js');
    const compiler = webpack(webpackConfig);

    app.use(devServer(compiler, {
        publicPath: webpackConfig.output.publicPath || '/public/',
        stats: webpackConfig.devServer.stats,
    }));

    app.use(hotServer(compiler, {
        log: console.log,
    }));
} else {
    app.use('/public', express.static(path.join(__dirname, '../public')));
}

app.use(registerControllers('/api'));
app.set('port', process.env.DEV_PORT || '1337');

getConnectionManager().create({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Hero],
    autoSchemaSync: true,
});

export const connection = getConnectionManager().get().connect();

const listener = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + listener.address().port);
});
