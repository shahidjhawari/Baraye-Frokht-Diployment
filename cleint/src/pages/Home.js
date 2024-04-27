import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"mobiles"} heading={"Top's Mobiles"}/>
      <HorizontalCardProduct category={"electronic"} heading={"Top's Electronic"}/>

      <VerticalCardProduct category={"appliances"} heading={"Home Appliances"}/>
      <VerticalCardProduct category={"bikes"} heading={"Bikes"}/>
      <VerticalCardProduct category={"property"} heading={"Property"}/>
      <VerticalCardProduct category={"services"} heading={"Services"}/>
      <VerticalCardProduct category={"fashion"} heading={"Fashion"}/>
      <VerticalCardProduct category={"books"} heading={"Books"}/>
      <VerticalCardProduct category={"pets"} heading={"Pets"}/>
      <VerticalCardProduct category={"other"} heading={"Other"}/>
    </div>
  )
}

export default Home