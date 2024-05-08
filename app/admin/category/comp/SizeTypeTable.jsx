const SizeTypeTable = (props) => {
  const data = props.sizetype;

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="vendor_order_boxed pt-4">
            <div className="table-responsive">
              <table className="table pending_table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((data) => {
                    return (
                      <tr key={data?.id}>
                        <td className="hover:tw-text-blue-600 tw-cursor-pointer">
                          #{data?.id}
                        </td>
                        <td className="hover:tw-text-blue-600 tw-cursor-pointer">
                          {data?.name}
                        </td>
                        <td className="hover:tw-text-blue-600 tw-cursor-pointer">
                          {data?.type}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeTypeTable;
