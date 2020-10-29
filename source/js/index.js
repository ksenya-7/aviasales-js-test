import API from './api/api';
import Loader from './components/loader/loader';
import PageHeader from './components/page-header/page-header';
import PageMain from './components/page-main/page-main';
import Sort from './components/sort/sort';
import TicketsContainer from './components/tickets/tickets';
import { RenderPosition } from './helpers/constants.js';
import { render } from './helpers/render.js';
import TicketsModel from './models/tickets';
import FilterController from './controllers/filter-controller';

const api = new API();
const loader = new Loader();
const ticketsModel = new TicketsModel(api, loader);
const pageHeaderComponent = new PageHeader();
const pageMainComponent = new PageMain();
const ticketsContainerComponent = new TicketsContainer();
const sortComponent = new Sort();

render(document.body, pageHeaderComponent);
render(document.body, pageMainComponent);

const mainContentWrapper = document.querySelector('.main-content-wrapper');
const filterController = new FilterController(mainContentWrapper, ticketsModel);

filterController.render();
render(mainContentWrapper, ticketsContainerComponent);

const ticketsWrapper = mainContentWrapper.querySelector('.tickets__wrapper');

render(ticketsWrapper, sortComponent, RenderPosition.BEFOREBEGIN);
render(ticketsWrapper, loader);

ticketsModel.initTickets(ticketsWrapper);
