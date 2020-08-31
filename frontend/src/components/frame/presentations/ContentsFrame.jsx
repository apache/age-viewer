import React, { useState, useEffect } from 'react'
import { Carousel, Collapse } from 'react-bootstrap';



const ContentFrame = ({ refKey, isPinned, reqString, playTarget, removeFrame, pinFrame }) => {
    const [isExpanded, setIsExpanded] = useState(true)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [slides, setSlides] = useState([])

    import('../../../documents/tutorial/' + playTarget.toLowerCase()).then(content => {
        setTitle(content.title)
        setDescription(content.description)
        setSlides(content.slides)
    })
    
    const setIconForIsExpanded = (isExpanded) => {
        if (isExpanded) {
            return <span className="fas fa-angle-up fa-lg" aria-hidden="true"></span>
        } else {
            return <span className="fas fa-angle-down fa-lg" aria-hidden="true"></span>
        }
    }

    return (
        <div className="card mt-3">
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto"><strong> $ {reqString} </strong></div>
                    <button className={"frame-head-button btn btn-link px-3" + (isPinned ? " selected " : "")} onClick={() => pinFrame(refKey)}><span className="fas fa-paperclip fa-lg"
                        aria-hidden="true"></span></button>
                    <button className="frame-head-button btn btn-link px-3" data-toggle="collapse"
                        aria-expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} aria-controls={refKey}>
                        {setIconForIsExpanded(isExpanded)}</button>
                    <button className="frame-head-button btn btn-link pl-3">
                        <span className="fas fa-times fa-lg" aria-hidden="true" onClick={() => removeFrame(refKey)}></span></button>
                        
                </div>
            </div>
            <Collapse in={isExpanded}>

                <div className="card-body" id={refKey} style={{padding: 'initial'}}>
                        <Carousel interval={null} fade={true} wrap={false}
                        prevIcon={<span aria-hidden="true"><i className="fas fa-angle-left fa-lg"></i></span>} 
                        nextIcon={<span aria-hidden="true"><i className="fas fa-angle-right fa-lg"></i></span>}>
                            {slides.map((slide)=>(
                            <Carousel.Item>
                                <div style={{paddingTop:'10px'}}>
                                    {slide}
                                </div>
                            </Carousel.Item>
                            ))}
                        </Carousel>
                </div>

            </Collapse>
            <div className="card-footer">

            </div>
        </div>

    );
}

export default ContentFrame