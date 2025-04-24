import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={300}
    height={480}
    viewBox="0 0 300 550"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
   
    <circle cx="150" cy="135" r="135" /> 
    <rect x="0" y="290" rx="10" ry="10" width="300" height="33" /> 
    <rect x="0" y="350" rx="10" ry="10" width="300" height="100" /> 
    <rect x="0" y="490" rx="10" ry="10" width="90" height="40" /> 
    <rect x="112" y="490" rx="23" ry="23" width="165" height="50" /> 
   
  </ContentLoader>
)

export default MyLoader