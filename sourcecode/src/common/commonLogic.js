 
 import {Helper} from '../common/helper';
 const getLoaderConfig = () => {
    var options = {
        lines: 13,
        length: 20,
        width: 10,
        radius: 30,
        scale: 1.00,
        corners: 1,
        color: '#000',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1,
        trail: 60,
        fps: 20,
        zIndex: 2e9,
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
    };
    return options;
}
const reBalance = function(assetClass, detail,assetClassDetails){
    assetClass.forEach(asset => {
        const modified = [], unmodified = []
        detail.instruments.forEach(item => {
            if(item.asset_class === asset){
                if(item.newValue === undefined || item.newValue === item.actual_weight){
                    unmodified.push(parseFloat(item.actual_weight))
                }
                else {
                    modified.push(parseFloat(item.newValue))
                }
            }
        });

        const modifiedSumValue = Helper.sumOfArray(modified);
        const unmodifiedSumValue = Helper.sumOfArray(unmodified);
        const target = assetClassDetails[asset].actual_weight - modifiedSumValue;
        detail.instruments.forEach(item => {
            if(item.asset_class === asset){
                if(item.newValue === undefined || item.newValue === item.actual_weight){
                    item.newValue = (parseFloat(item.actual_weight)/parseFloat(unmodifiedSumValue)) * target
                }
            }
        });

      })
      detail.instruments.forEach(item => {
        if(item.newValue !== undefined ){
            item.actual_weight = parseFloat(item.newValue).toFixed(2);
            item.newValue = undefined;
        }
    });
    return detail;

}
export const CommonLogic = {
    getLoaderConfig,
    reBalance,
}