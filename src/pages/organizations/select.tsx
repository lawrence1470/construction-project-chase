import { OrganizationSwitcher } from "@clerk/nextjs";

const OrgSelection = () => {
  return (
    <div>
      <h1>Org Selection</h1>
      <OrganizationSwitcher />
    </div>
  );
};

export default OrgSelection;
