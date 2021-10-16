import React from 'react'
import Helmet from 'react-helmet'

const MedaData = ({title}) => {
    return (
        <Helmet>
            <title>
                {title}
            </title>
        </Helmet>
    )
}

export default MedaData
