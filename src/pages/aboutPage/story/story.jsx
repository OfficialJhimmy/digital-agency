import React from 'react'
import '../story/story.scss';
import Advertiser from '../../../components/advertiser/advertiser';

const Story = () => {
    return (
        <div className="story">
            <p className="title">Who Are We</p>
            <h5>We are a group that develops reliable digital strategies and communication campaigns for SMES</h5>
            <Advertiser />
        </div>
    )
}

export default Story;
