import "./styles.css";

const userData = {
  userInfo: {
    hierarchy: [
      {
        depth: 1,
        departmentName: "sample1"
      },
      {
        depth: 2,
        departmentName: "sample2"
      }
    ]
  }
};

/** 組織階層を名称で返却 */
export const createHierarchy = (hierarchy: any[]): string => {
  if (!hierarchy || !hierarchy.length) return "";
  return sort(hierarchy, "depth", false)
    .map((org) => {
      if (org.organizationName) return org.organizationName;
      if (org.departmentName) return org.departmentName;
      return "";
    })
    .join(" / ");
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
