import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <button
                    type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
                <a className="navbar-brand" href="#">
                    Food
                </a>
            </div>

            <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
            >
                <ul className="nav navbar-nav">
                    <li>
                        <a href="#">Recipes</a>
                    </li>

                    <li className="dropdown">
                        <a
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Grocery<span className="caret" />
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to={'/'}>Build List</Link>
                            </li>
                            <li>
                                <Link to={'/store'}>Store</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <a
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Food<span className="caret" />
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <a href="/foodBrowser">Food List</a>
                            </li>
                            <li>
                                <a href="#">Add Food</a>
                            </li>
                            <li role="separator" className="divider" />
                            <li>
                                <a href="#">Aisle Organizer</a>
                            </li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <a
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Settings<span className="caret" />
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <a href="#">Stores</a>
                            </li>
                            <li>
                                <a href="#">Store Aisles</a>
                            </li>
                            <li role="separator" className="divider" />
                            <li>
                                <a href="#">Aisle Organizer</a>
                            </li>
                            <li>
                                <a href="#">Aisle Organizer</a>
                            </li>
                            <li>
                                <a href="#">Aisle Organizer</a>
                            </li>
                            <li>
                                <a href="#">Aisle Organizer</a>
                            </li>
                        </ul>
                    </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to={'/signout'}>Sign Out</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);
export default Header;
