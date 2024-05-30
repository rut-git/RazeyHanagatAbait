import React from 'react';
import { Card } from 'primereact/card';
import './Article.css'
import { useGetArticleByNameQuery } from '../app/articleApiSlice'
import { useParams } from 'react-router-dom'



import { Accordion, AccordionTab } from 'primereact/accordion';
import { Panel } from 'primereact/panel';

export default function Article(props) {
    return (
        <div >
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