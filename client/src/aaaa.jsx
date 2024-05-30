import React, { useRef, useState } from "react";
import { CascadeSelect } from 'primereact/cascadeselect';
import { Editor } from "primereact/editor";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import BarSeg from "./BarSeg";
import PieSeg from "./PieSeg";
import LineSeg from "./LineSeg";


const SegQuestion = (props) => {
    let { select, setSelect, question, text, setText } = props
//ניסיון
    const index = select.indexOf(select.find(q => q._id == question._id))

    const indexForText = text.indexOf(text.find(q => q._id == question._id))

    const [bar, setBar] = useState(false);
    const [pie, setPie] = useState(false);
    const [line, setLine] = useState(false);
    const labels = question.answers.map(a => { return a.body })
    const data = question.answers.map(a => a.count)
    const Bar = () => {
        setBar(true)
        setLine(false)
        setPie(false)
    }
    const Pie = () => {
        setPie(true)
        setLine(false)
        setBar(false)
    }
    const Line = () => {
        setLine(true)
        setBar(false)
        setPie(false)
    }
    const segment = (kind) => {
        kind == 'גרף' ? Line() :
            kind == 'היסטוגרמה' ? Bar() :
                Pie()
    }
    const [selectedCity, setSelectedCity] = useState(select[index].select ? select[index].select : select ? 'תרשים עוגה' : console.log('selectedCity'));
    const countries = [
        { cname: 'תרשים עוגה', code: 'US-AU' },
        { cname: 'גרף', code: 'US-DA' },
        { cname: 'היסטוגרמה', code: 'US-HO' }]


    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                {option.states && <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                /*className={`flag flag-${option.code.toLowerCase()}`}*/ style={{ width: '18px' }} />}
                {option.cname == 'תרשים עוגה' && <i className="pi pi-chart-pie" />}
                {option.cname == 'היסטוגרמה' && <i className="pi pi-chart-bar" />}
                {option.cname == 'גרף' && <i className="pi pi-chart-line" />}
                <span>{option.cname || option.name}</span>
            </div>
        );
    }
    const withI = () => {
        if (select) {
            if (select[index].select) {
                let icon = ''
                select[index].select == 'תרשים עוגה' ? icon = "pi pi-chart-pie" : select[index].select == 'היסטוגרמה' ? icon = "pi pi-chart-bar" : icon = "pi pi-chart-line";
                <div>
                    {select[index].select && <i className={icon} />}
                </div>
            }
        }
        else
            return 'select'
    }
    return (
        <>
            <Card header={<Divider layout='horizontal' />} style={{ maxBlockSize: '470px' }}>
                <div style={{ textAlign: 'center' }}>
                    <h3>{question.body}</h3></div>
                <div className="card flex justify-content-center">

                    <CascadeSelect value={selectedCity} onChange={e => { select[index].select = e.value; setSelectedCity(e.value.cname); setSelect(select); segment(e.value.cname) }} options={countries}
                        optionLabel="cname" optionGroupLabel="name" optionGroupChildren={['states', 'cities']}
                        className="w-full md:w-14rem" breakpoint="767px" placeholder={withI} itemTemplate={countryOptionTemplate} style={{ minWidth: '14rem' }} />



                </div>
                <div className="card">
                    <Editor value={text[indexForText].text} onTextChange={(e) => { text[indexForText].text = e.htmlValue; setText(text); }} style={{ height: '120px' }} />
                </div></Card><br />{bar && <BarSeg labels={labels} data={data} question={question} />}
            {pie && <PieSeg labels={labels} data={data} question={question} />}
            {line && <LineSeg labels={labels} data={data} question={question} />}</>
    )
}
export default SegQuestion

