import React from 'react';
import './Article.css'




import { Accordion, AccordionTab } from 'primereact/accordion';

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