import React , { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildrControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
 
class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        }else {
            this.props.onSetAuthRedirectPath('checkout');
            this.props.history.push('/auth')
        }     
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum , el) => {
            return sum + el;
        } ,0);
       return sum>0;
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary = null;     
        let burger = this.props.error ? <p>Ingredients cant be loaded!</p> :<Spinner/>
        if(this.props.ings){
            burger = (<Auxiliary>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    price={this.props.price} 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved} 
                    disabled={disabledInfo}
                    isAuth= {this.props.isAuthenticated}
                    ordered={this.purchaseHandler}
                    purchasable={this.updatePurchaseState(this.props.ings)}/>
            </Auxiliary>);
            orderSummary = <OrderSummary price={this.props.price.toFixed(2)}
            ingredients={this.props.ings}
             purchaseCanceled={this.purchaseCancelHandler} 
             purchaseContinued={this.purchaseContinueHandler}/>;
        }
 
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
               {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
       onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
       onInitIngredients: () =>  dispatch(actions.initIngredients()),
       onInitPurchase: () => dispatch(actions.purchaseInit()),
       onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))   
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));