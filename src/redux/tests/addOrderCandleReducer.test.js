import addOrderCandleReducer from '../reducers/addOrderCandleReducer';

test('It should return an array of candle order info when order is reviewed', () => {
    let returnedStated = addOrderCandleReducer(undefined, {})
    expect(returnedStated).toEqual([])
})