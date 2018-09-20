import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

const RefreshIndicatorLoading = () => (
    <div style={{textAlign:"center"}}>
        <RefreshIndicator
            size={100}
            left={0}
            top={20}
            loadingColor="#FF9800"
            status="loading"
            style={style.refresh}
        />
    </div>
);

export default RefreshIndicatorLoading;