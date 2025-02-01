import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={200}
    height={350}
    viewBox="0 0 200 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="413" y="214" rx="3" ry="3" width="178" height="6" /> 
    <rect x="-3" y="0" rx="0" ry="0" width="170" height="320" /> 
    <rect x="10" y="328" rx="0" ry="0" width="150" height="15" />
  </ContentLoader>
)

export default MyLoader