const HomeTopBarStyle = {
  left:"calc(0% - 10px)", 
  top:"calc(0% - 10px)", 
  width:"calc(100% + 20px)", 
  height:"15%", 
  position:"absolute", 
  backgroundColor:"#f0f0f0",
  border: "10px solid #a7a7a7"
};

const AdminTopBarStyle = {
  left:"calc(0% - 20px)", 
  top:"calc(0% - 20px)", 
  width:"100%", 
  height:"15%", 
  position:"absolute", 
  backgroundColor:"#A3DD83",
  border: "10px solid #38817A"
};

const RegisterTopBarStyle = {
  left:"calc(0% - 20px)", 
  top:"calc(0% - 20px)", 
  width:"100%", 
  height:"15%", 
  position:"absolute", 
  backgroundColor:"#007C82",
  border: "10px solid #007C82"
};

const SearchBarStyle={
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `220px`,
  height: `6%`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  position: "absolute",
  left: '35%',
  top: 'calc(28% + 15px)',
}

export default {HomeTopBarStyle, AdminTopBarStyle, RegisterTopBarStyle, SearchBarStyle};