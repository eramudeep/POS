import React from 'react';

export class Header extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="button-list pull-left m-t-15 m-l-10">


                        <div className="btn-group p_one">
                            <button id="productModal" data-toggle="modal" data-target="#Products" type="button"
                                className="btn btn-default waves-effect waves-light">
                                <span className="btn-label"><i className=" 	glyphicon glyphicon-barcode"></i> </span> Products
                            </button>
                            <button id="newProductModal" data-toggle="modal" data-target="#newProduct" type="button"
                                className="btn btn-warning waves-effect waves-light">
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>

                        <div className="btn-group p_two">
                            <button id="categoryModal" data-toggle="modal" data-target="#Categories" type="button"
                                className="btn btn-default waves-effect waves-light">
                                <span className="btn-label"><i class="glyphicon glyphicon-th"></i> </span> Categories
                            </button>
                            <button id="newCategoryModal" data-toggle="modal" data-target="#newCategory" type="button"
                                className="btn btn-warning waves-effect waves-light">
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>

                        <button id="viewRefOrders" data-toggle="modal" data-target="#holdOrdersModal" type="button"
                            className="btn btn-info waves-effect waves-light">
                            <span className="btn-label"><i class="fa fa-shopping-basket"></i> </span> Open Tabs
                        </button>

                        <button id="viewCustomerOrders" data-toggle="modal" data-target="#customerModal" type="button"
                            onclick="$(this).getCustomerOrders()" className="btn btn-info waves-effect waves-light">
                            <span className="btn-label"><i className="fa fa-user"></i> </span> Customer Orders
                        </button>
                    </div>

                    <img className="loading m-t-5" style={{ marginLeft: "35%" }} height="50px" src="../../public/assets/images/loading.gif" alt=""></img>

                    <div className="button-list pull-right m-t-15 m-l-10">

                        <button id="settings" data-toggle="modal" data-target="#settingsModal" type="button"
                            className="btn btn-default waves-effect waves-light p_five">
                            <i className="glyphicon glyphicon-cog"></i>
                        </button>

                        <button id="transactions" type="button" className="btn btn-default waves-effect waves-light p_three">
                            <span className="btn-label"><i class=" 	glyphicon glyphicon-credit-card"></i> </span> Transactions
                        </button>

                        <button id="pointofsale" type="button" className="btn btn-default waves-effect waves-light">
                            <span className="btn-label"><i className=" 	glyphicon glyphicon-shopping-cart"></i> </span> Point of Sale
                        </button>

                        <div className="btn-group p_four">
                            <button id="usersModal" data-toggle="modal" data-target="#Users" type="button"
                                className="btn btn-default waves-effect waves-light">
                                <span className="btn-label"><i className=" 	glyphicon glyphicon-user"></i> </span> Users
                            </button>
                            <button id="add-user" data-toggle="modal" type="button" className="btn btn-dark waves-effect waves-light">
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>


                        <button type="button" className="btn btn-light waves-effect waves-light" id="cashier">
                            <span className="btn-label"><i className="glyphicon glyphicon-user"></i> </span> <span
                                id="loggedin-user"></span>
                        </button>

                        <button id="log-out" type="button" className="btn btn-warning waves-effect waves-light">
                            <i className="glyphicon glyphicon-log-out"></i>
                        </button>


                        <button id="quit" type="button" className="btn btn-danger waves-effect waves-light">
                            <i className="glyphicon glyphicon-off"></i>
                        </button>

                    </div>
                </div>
            </div>
        );
    }
}
