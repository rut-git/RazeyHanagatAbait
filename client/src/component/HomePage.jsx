
// import React from 'react';


// const HomePage = () => {

//     return (
//         <h1>home Page</h1>
//     )
// }
// export default HomePage

//  import React from 'react';


// const HomePage = () => {

//     return (
//         <h1>home Page</h1>
//     )
// }
// export default HomePage
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import './homePage.css'
import backgroundImage from '../chopa.jpg';
import ExternalHtmlComponent from './PAY'
import { useNavigate } from 'react-router-dom';
// import { ProductService } from './service/ProductService';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const navigate=useNavigate()
    // const responsiveOptions = [
    //     {
    //         breakpoint: '1400px',
    //         numVisible: 2,
    //         numScroll: 1
    //     },
    //     {
    //         breakpoint: '1199px',
    //         numVisible: 3,
    //         numScroll: 1
    //     },
    //     {
    //         breakpoint: '767px',
    //         numVisible: 2,
    //         numScroll: 1
    //     },
    //     {
    //         breakpoint: '575px',
    //         numVisible: 1,
    //         numScroll: 1
    //     }
    // ];

    // const getSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    useEffect(() => {
        setProducts([{name:"חיים כץ",code:'אני מאד מאד ממליץ!!!'},{name:"מרדכי אברמוביץ",code:'אני מאד מאד ממליץ!!!'},{name:"אבהרם דוידוביץ",code:'אני מאד מאד ממליץ!!!'},{name:"יעקב כהן",code:'אני מאד מאד ממליץ!!!'},{name:"ד.פולישוק",code:'אני מאד מאד ממליץ!!!'},{name:"אפרים נחם",code:'אני מאד מאד ממליץ!!!'},{name:"ישראל שפיגל",code:'אני מאד מאד ממליץ!!!'},{name:"ישראל שפירא",code:'אני מאד מאד ממליץ!!!'},{name:"יהודה ב.",code:'אני מאד מאד ממליץ!!!'},{name:"מנחם רוזנברג",code:'אני מאד מאד ממליץ!!!'},{name:"שלום ברנהולץ",code:'אני מאד מאד ממליץ!!!'},{name:"קובי ברומר",code:'אני מאד מאד ממליץ!!!'}])
    }, []);

    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3" >
                <div className="mb-3">
                   המלצה
                </div>
                <div style={{height:'20px'}}>
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">{product.code}</h6>
                    {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                    {/* <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                    </div> */}
                </div>
            </div>
        );
    };

    return (
        <div className="card" id='grid-container'>
            
            {/* <br></br>
            <br></br>
            <br></br> */}
            <Carousel value={products} numVisible={1} numScroll={1} className="custom-carousel" orientation="vertical"
            autoplayInterval={3000} itemTemplate={productTemplate} style={{marginTop:'15%'}} id="content"/>
            {/* <Button onClick={()=>navigate("/externalHtmlComponent")}>לתשלום</Button> */}
            <img src={backgroundImage} className="image"></img>
        </div>
    )
}