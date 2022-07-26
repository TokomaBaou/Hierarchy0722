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

/** ソート処理 */
export const sort = (data: any[], key: string, isReverse: boolean) => {
  const sortBy = () => {
    return (a: any, b: any) => {
      const orderBy = isReverse ? 1 : -1;
      if (a[key] < b[key]) return orderBy;
      if (a[key] > b[key]) return orderBy * -1;
      return 0;
    };
  };
  return data.sort(sortBy());
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

//パラメータに型付与、返り値に型付与
/** 第一階層だけ */
const setOrganizationList: OrganizationListType[] = resultData.departmentList.map(
  (dep) => {
    const belong: BelongType[] = [
      {
        belongList: dep.belongList,
        departmentCd: dep.departmentCd,
        departmentName: dep.departmentName
      }
    ];
    const topOrganization: OrganizationListType = {
      departmentCd: dep.departmentCd,
      departmentName: dep.departmentName,
      belongList: createBelongList(belong)
    };
    return topOrganization;
  }
);

/** 組織階層形式で返却(1-5階層全て) */
const createBelongList = (departmentList: BelongType[]): BelongType[] => {
  // 返却値
  const rtnOrgList: BelongType[] = [];
  departmentList.forEach((dep) => {
    // プルダウンリストを生成
    rtnOrgList.push({
      departmentCd: dep.departmentCd,
      departmentName: dep.departmentName,
      belongList: dep.belongList
    });
    // 子組織がある場合
    if (dep.belongList.length !== 0) {
      belongHierarchy(dep.belongList, [dep.departmentName], rtnOrgList);
    }
  });
  return rtnOrgList;
};

/** 子階層のプルダウンリストを生成 */
export const orgHierarchy = (
  belongList: Department[],
  group: string,
  parent: string[],
  orgList: Select[]
) => {
  const setOrgList: Select[] = orgList;
  belongList.forEach((dep) => {
    // 階層名称を生成
    const setParent = [...parent, dep.name];
    // プルダウンリストを生成
    setOrgList.push({
      value: dep.departmentCd,
      label: setParent.join(" / "),
      group: group
    });
    // 子組織がある場合
    if (dep.belongList.length !== 0) {
      //（階層数だけループ処理）
      orgHierarchy(dep.belongList, group, setParent, setOrgList);
    }
  });
};

/** 組織プルダウンリスト形式で返却 */
export const createOrganizationList = (
  departmentList: Department[]
): Select[] => {
  // 返却値
  const rtnOrgList: Select[] = [];
  sort(departmentList, "sortKey", false).forEach((dep) => {
    // プルダウンリストを生成
    rtnOrgList.push({
      value: dep.departmentCd,
      label: dep.name,
      group: dep.name
    });
    // 子組織がある場合
    if (dep.belongList.length !== 0) {
      orgHierarchy(dep.belongList, dep.name, [dep.name], rtnOrgList);
    }
  });
  return rtnOrgList;
};

const orgHierarchy = () => {};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
