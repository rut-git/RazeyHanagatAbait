import React from 'react';
import { Card } from 'primereact/card';
import './Article.css'
import { useGetArticleByNameQuery } from '../app/articleApiSlice'
import { useParams } from 'react-router-dom'

// export default function Article(props) {
//     // const { name } =props.name.name
//     // const { data, isError, isSuccess } = useGetArticleByNameQuery(name)
// console.log("Article")
//     return (
//         <div className="card1">


//             <Card title={props.name.name}>
//                 <p className="m-0">
//                    {props.name.article}
//                 </p>
//             </Card>

//         </div>
//     )
//  }

import { Accordion, AccordionTab } from 'primereact/accordion';
import { Panel } from 'primereact/panel';

export default function Article(props) {
    return (
        <div >
             {/* <Panel style={{ textAlign: 'center' }} header={'חחחחח הסקר'}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: props.name.article
                            }}></div></Panel> */}
            <Accordion multiple activeIndex={[1]} dir='rtl'>
                <AccordionTab header={props.name.name}>
                   
                <div
                            dangerouslySetInnerHTML={{
                                __html: props.name.article
                            }}></div>
                </AccordionTab>
            </Accordion>
        </div>
    )
}