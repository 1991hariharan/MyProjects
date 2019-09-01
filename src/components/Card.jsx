
import { connect } from 'react-redux';
import React, { Component } from 'react';
import CardProperty from './CardProperty'
class Card extends Component {
    render(){
       if(this.props.list && this.props.list.length > 0){
           return (<div className='row'>
               {
                    (this.props.list && this.props.list.map((item, index) => {
                        const imageId = index + 1
                        const imageUrl =require('../assets/images/card_'+imageId+'.png');
                        return(<div key={index} onClick={e => this.props.onClick(item.id)} className="card col-lg-4 col-xs-6 col-md-6 col-sm-6">
                            <img src={imageUrl} alt={item.name}  />
                           <CardProperty value={item.volatility} name='Volatility'></CardProperty>
                           <CardProperty value={item.one_month_return} name='One Month Return'></CardProperty>
                           <CardProperty value={item.mean_return} name='Mean Return'></CardProperty>
                           <CardProperty value={item.min_investment} name='Minimum Investment'></CardProperty>
                           <CardProperty value={item.eligibility} name='Eligibility'></CardProperty>
                            <div className='action-box'>
                                Explore Investment Idea
                            </div>
                        </div>)
                    }))
               }
           </div>)
       
       }
       else {
           return(<div></div>)
       }
       
        
    }
}


const mapStateToProps = state => {
    return { };
};
  
const mapDispatchToProps = dispatch => ({
   
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);