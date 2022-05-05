import React from 'react'
import '../Report-Modal/report-modal.scss';
import '../ads-history/ads-history.scss';

const ReportModal = ({show, setShow, fbData}) => {
    console.log(fbData);
    return (
        <div className="report-modal" style={{display : show}}>
            <div className="container">
                <div className="history-table">
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Campaign Name</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Views</th>
                        <th scope="col">Clicks</th>
                        <th scope="col">Status</th>
                        <th scope="col">Spent</th>
                        <th scope="col">Ads Detail</th>
                        </tr>
                    </thead>
                        {
                            fbData.map( ({insights, name, id}) => {
                                const target_ad_insights = insights.data;
                                console.log(target_ad_insights);

                                let clickAction = "";
                                let likeAction = "";
                        
                                target_ad_insights.map(({actions}) => {
                                    const Allclicks = actions[0];
                                    if(Allclicks.action_type === "link_click"){
                                        clickAction = Allclicks;
                                    }else if(Allclicks.action_type === "like"){
                                        likeAction = Allclicks;
                                    }
                                })
                                
                                let TotalClicks = Number(clickAction.value);
                                let TotalLikes = Number(likeAction.value);

                                //cleaning ads title
                                const adTitle = name;
                                const newSplit = adTitle.split(" ");
                                const neededItem = newSplit.shift();
                                const newTitle = newSplit.join(" ");

                                return <tbody>
                                    <tr key={id}>
                                        <td>Facebook</td>
                                        <td>{newTitle}</td>
                                        <td>{(!TotalLikes) ? "-" : TotalLikes }</td>
                                        <td>{target_ad_insights[0].impressions}</td>
                                        <td>{(!TotalClicks) ? "-" : TotalClicks}</td>
                                        <td>Ended</td>
                                        <td>{target_ad_insights[0].spend}</td>
                                        <td>on your own</td>
                                    </tr>
                                    <tr>  
                                        <td>Google</td>
                                        <td>50,000</td>
                                        <td>Paid</td>
                                        <td>-</td>
                                        <td className="invoice">view now</td>
                                        <td className="invoice">view now</td>
                                        <td className="invoice">view now</td>
                                        <td className="invoice">view now</td>
                                    </tr>
                                    <tr>
                                        <td>Linkedin</td>
                                        <td>10,000</td>
                                        <td>Paid</td>
                                        <td>-</td>
                                        <td className="invoice">view now</td>
                                        <td className="invoice">view now</td>
                                        <td className="invoice">view now</td>
                                        <td className="invoice">view now</td>
                                    </tr>
                                </tbody>
                            })
                        }
                    </table>
                    <button className="my-5" onClick={() => setShow("none")}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ReportModal;
