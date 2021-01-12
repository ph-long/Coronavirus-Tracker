import React from "react";

import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import style from './Cards.module.css';
import CountUp from "react-countup";
import cx from 'classnames';

const Cards = ({data : {confirmed, recovered, deaths, lastUpdate}}) => {
    /* Since fetchData is asyc we need a case for when data hasn't arrived yet*/
    if (!confirmed) {
        return 'Loading';
    }
    return (
        <div className = {style.container}>
            {/* All of this from material-ui to make cards easier */}
            {/* property of container, spacing cards 3, justyify content to center */}
            <Grid container spacing={3} justify="center">
                {/* The item inside the Grid are cards*/}
                {/* Card styling, xs and md are how large should cards be for screen sizes
                    cx allows a for both styles to be applied to said card*/}
                <Grid item component={Card} xs={12} md={3} className={cx(style.card, style.infected)}>
                    <CardContent>
                        {/* Typography is like h1 but with more style options*/}
                        {/* gutterBottom is bottom padding */}
                        <Typography color="textSecondary" gutterBottom> Infected </Typography>
                        <Typography variant="h5">
                            {/* Countup animates a counter from confirmed cases */}
                            <CountUp start={0} end={confirmed.value} duration={2.0} separator=","/>
                        </Typography>
                        {/* lastUpdate returns a computerized date, make to normal date */}
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2"> Number of active cases of Covid-19 </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(style.card, style.recovered)}>
                    <CardContent>
                        {/* Typography is like h1 but with more style options*/}
                        {/* gutterBottom is bottom padding */}
                        <Typography color="textSecondary" gutterBottom> Recovered </Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={recovered.value} duration={2.0} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2"> Number of recovered cases of Covid-19 </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(style.card, style.deaths)}>
                    <CardContent>
                        {/* Typography is like h1 but with more style options*/}
                        {/* gutterBottom is bottom padding */}
                        <Typography color="textSecondary" gutterBottom> Deaths </Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths.value} duration={2.0} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2"> Number of deaths from Covid-19 </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;