import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const Invoice = ({ bookingOBj }) => {
  return (
    <Document>
      <Page size="A4" className="flex flex-col m-2 p-1 bg-white">
        <View style={{ backgroundColor: "#7B2CBF" }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: "40px" }}
            >
              Invoice
            </Text>
          </View>

          {/* Company address and logo */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#7B2CBF",
            }}
          >
            <View style={{ margin: "20px", marginTop: "30px" }}>
              <Image
                src="../../logo.png"
                style={{ height: "60px", width: "150px" }}
              ></Image>
            </View>
            <View style={{ margin: "20px" }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "15px",
                  margin: "5px",
                }}
              >
                TrippyWay
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "5px",
                }}
              >
                MNNIT Allahabad,
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "5px",
                }}
              >
                Prayagraj,
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "5px",
                }}
              >
                Uttar Pradesh,
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "5px",
                }}
              >
                211004
              </Text>
            </View>
          </View>
        </View>
        {/* Customer address */}
        <View
          style={{
            margin: "20px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{ fontWeight: "medium", fontSize: "15px", margin: "5px" }}
            >
              Bill to :
            </Text>
            <View style={{ marginLeft: "50px" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  margin: "1px",
                }}
              >
                {bookingOBj.userId}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingOBj.address.address1}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingOBj.address.address2}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingOBj.address.city}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingOBj.address.state}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingOBj.address.country}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingOBj.address.postalCode}
              </Text>
            </View>
          </View>
          {/* orderId   */}
          <View>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "10px",
                margin: "1px",
              }}
            >
              Order Id : {bookingOBj.orderId}
            </Text>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "10px",
                margin: "1px",
              }}
            >
              Booking Date : 25th May 2024
            </Text>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "10px",
                margin: "1px",
              }}
            >
              TrippyWay GST No. : GST456763
            </Text>
          </View>
        </View>
        {/* Horizontal line */}
        <View
          style={{
            borderBottom: "0.5px solid black",
            marginTop: "10px",
            marginBottom: "10px",
            margin:"10px"
          }}
        />
        {/* Total payment */}
        <View
          style={{
            margin: "10px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View styles={{ margin: "5px" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "15px",
                margin: "1px",
              }}
            >
              Package Name
            </Text>
          </View>
          <View styles={{ margin: "5px" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                margin: "1px",
              }}
            >
              Price
            </Text>
          </View>
        </View>
        {/* Horizontal line */}
        <View
          style={{
            borderBottom: "0.5px solid black",
            marginTop: "10px",
            marginBottom: "10px",
            margin:"10px"
          }}
        />
        <View
          style={{
            margin: "10px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View styles={{ margin: "10px" }}>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "15px",
                margin: "1px",
              }}
            >
              {bookingOBj.PackageName}
            </Text>
          </View>
          <View styles={{ margin: "10px" }}>
            <Text>{bookingOBj.price}</Text>
          </View>
        </View>
        <View
          style={{
            margin: "10px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View styles={{ margin: "10px" }}>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "10px",
                margin: "1px",
              }}
            >
              GST
            </Text>
          </View>
          <View styles={{ margin: "10px" }}>
            <Text>{bookingOBj.gst}</Text>
          </View>
        </View>
        {/* Horizontal line */}
        <View
          style={{
            borderBottom: "0.5px solid black",
            marginTop: "5px",
            marginBottom: "5px",
            margin:"10px"
          }}
        />
        <View
          style={{
            margin: "10px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View styles={{ margin: "10px" }}>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "15px",
                margin: "1px",
              }}
            >
              Total
            </Text>
          </View>
          <View styles={{ margin: "10px" }}>
            <Text>{bookingOBj.price + 100}</Text>
          </View>
        </View>
        {/* Horizontal line */}
        <View
          style={{
            borderBottom: "0.5px solid black",
            marginTop: "5px",
            marginBottom: "5px",
            margin:"10px"
          }}
        />
      </Page>
    </Document>
  );
};

export default Invoice;
