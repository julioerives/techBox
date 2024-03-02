import React from 'react'
import { Footer } from '../components/Footer';
import { Navs } from '../components/Navs';
import { Initial } from "../components/Initial";
import { Grid } from "../components/Grid";
import { Content } from "../components/Content";
import { Divisor } from "../components/Divisor";
import { Content2 } from "../components/Content2";
import { AboutUs } from "../components/AboutUs";
import Goodness from "../components/goodness";
export default function Home() {
  return (
    <>
    <Navs></Navs>
    <Initial></Initial>
    <Content2></Content2>
    <Divisor Mensaje={"TechBox"}></Divisor>
    <Content></Content>
    <Divisor Mensaje={"TechBox"}></Divisor>
    <Grid></Grid>
    <Divisor Mensaje={"TechBox"}></Divisor>
    <Goodness></Goodness>
    <Divisor Mensaje={"TechBox"}></Divisor>
    <AboutUs />
    <Footer></Footer>
    </>
  )
}
