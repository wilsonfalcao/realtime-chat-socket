export const MessageRedux = (state = [], action) =>{

    switch(action.type){
        
        case "@message/GETMESSAGE":
            state = [...state, action.message];
            state.sort(function(a,b){ return a.date < b.date});
            return state;
        case "@message/CLEAR":
            return null;
        default :
            return state;
    }
}