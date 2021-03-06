import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import BackDrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer , classes.Close];
    if(props.open){
       attachedClasses = [classes.SideDrawer , classes.Open];
    }
    return (
        <Auxiliary>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems  isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;