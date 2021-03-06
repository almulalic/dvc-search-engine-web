import React from "react";
import {
  Typography,
  List,
  Collapse,
  Checkbox,
  Button,
  message,
  Space,
} from "antd";
import {
  BrokerTypes,
  ResortTypes,
  UseYearTypes,
  StatusTypes,
} from "../../../shared/Types";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export const OpenModalInnerMarkup = ({ savedFilters, setOpenModalVisible }) => {
  const listMarkup = (save) => {
    const { name, filters } = save;

    if (!filters) return;

    return (
      <List header={<Title level={5}>Filter overview</Title>} bordered>
        <List.Item>
          <Text strong>ID:</Text>
          <Text>{filters.idInput.length === 0 ? "-" : filters.idInput}</Text>
        </List.Item>
        <List.Item>
          <Text strong>Brokers:</Text>
          <Text>
            {filters.broker.length === 0
              ? "None."
              : filters.broker.map((x, id) => {
                  if (id != filters.broker.length - 1)
                    return BrokerTypes[x] + ", ";
                  else return BrokerTypes[x];
                })}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Resorts:</Text>
          <Text>
            {filters.resort.length === 0
              ? "None."
              : filters.resort.map((x, id) => {
                  if (id != filters.resort.length - 1)
                    return ResortTypes[x] + ", ";
                  else return ResortTypes[x];
                })}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Use Years:</Text>
          <Text>
            {filters.useYear.length === 0
              ? "None."
              : filters.useYear.map((x, id) => {
                  if (id != filters.useYear.length - 1)
                    return UseYearTypes[x] + ", ";
                  else return UseYearTypes[x];
                })}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Statuses:</Text>
          <Text>
            {filters.status.length === 0
              ? "None."
              : filters.status.map((x, id) => {
                  if (id != filters.broker.length - 1)
                    return StatusTypes[x] + ",";
                  else return StatusTypes[x];
                })}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Points:</Text>
          <Text>
            From {filters.pointsRange[0]} P to {filters.pointsRange[1]} P
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Price:</Text>
          <Text>
            From {filters.priceRange[0]} $ to {filters.priceRange[1]} $
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Price Per Point:</Text>
          <Text>
            From {filters.pricePerPointRange[0]} P/$ to
            {filters.pricePerPointRange[1]} P/$
          </Text>
        </List.Item>

        <List.Item>
          <Text strong>Sort By:</Text>
          <Text>{filters.sidx}</Text>
        </List.Item>
        <List.Item>
          <Text strong>Order:</Text>
          <Text>{filters.sord}</Text>
        </List.Item>
        {/* <List.Item>
        <Text strong>Items Per Page:</Text>
        <Text>{filters.itemsPerPage}</Text>
      </List.Item> */}
        <List.Item>
          <Text strong>Include Defective Data:</Text>
          <Text>{filters.includeDefectiveData ? "Yes." : "No."}</Text>
        </List.Item>
        <List.Item>
          <Text strong>Submit On Change:</Text>
          <Text> {filters.submitOnChange ? "Yes." : "No."}</Text>
        </List.Item>
        <List.Item>
          <Text strong>Multiple Column Filter:</Text>
          <Text> {filters.multipleColumnFilter ? "Yes." : "No."}</Text>
        </List.Item>
      </List>
    );
  };

  return (
    <div>
      <Title level={5}>Filter Overview </Title>
      <Collapse accordion>
        {savedFilters.length > 0 ? (
          savedFilters?.map((save, key) => {
            return (
              <Panel
                header={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Title level={5} style={{ margin: 0 }}>
                      {save.name}
                    </Title>
                    <div>
                      <Button
                        type="primary"
                        danger
                        style={{ marginRight: "10px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          localStorage.setItem(
                            "filters",
                            JSON.stringify(
                              savedFilters.filter((s) => s.name !== save.name)
                            )
                          );
                          setOpenModalVisible(false);
                          message.success("Successfully removed saved item!");
                          window.location.reload();
                        }}
                      >
                        Remove
                      </Button>
                      <Button
                        type="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href =
                            process.env.REACT_APP_BASE_SEARCH_URL +
                            "?" +
                            new URLSearchParams(save.filters);
                        }}
                      >
                        Open
                      </Button>
                    </div>
                  </div>
                }
                key={key}
              >
                {listMarkup(save)}
              </Panel>
            );
          })
        ) : (
          <Space>
            <Title level={4}>
              There are no saves available. Please add one or more to continue.
            </Title>
          </Space>
        )}
      </Collapse>
    </div>
  );
};
