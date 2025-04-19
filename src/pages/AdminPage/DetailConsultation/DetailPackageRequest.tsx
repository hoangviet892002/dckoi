import { TableComponent } from "@/components";
import { PackageItemType } from "@/models";

const DetailPackageRequest = ({ detail }) => {
  const formatValue = (value: string, prop: string, item: any) => {
    if (prop === "description") {
      if (item.description && item.quantity) {
        return (
          <div className="flex flex-col">
            <span className="">{item.quantity}</span>
            <span>{item.description}</span>
          </div>
        );
      }
      if (item.description) {
        return <span>{item.description}</span>;
      }
      if (item.quantity) {
        return <span>{item.quantity}</span>;
      } else return "Bao gồm";
    }

    return value;
  };

  return (
    <div>
      <TableComponent<PackageItemType>
        columns={["Danh mục", "Mô tả"]}
        data={detail.items}
        props={["name", "description"]}
        formatValue={formatValue}
        actions={false}
        enablePagination={false}
      />
    </div>
  );
};

export default DetailPackageRequest;
