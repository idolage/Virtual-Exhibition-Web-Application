// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// layout components
import HomeLayout from "./components/HomeLayout";

// Images
import bgImage from "assets/images/Nerabum.jpg";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";


// @mui material components
import typography from "assets/theme/base/typography";
const { size } = typography;

export default function Home() {
  return (
    <HomeLayout image={bgImage} overflow="hidden">
      <Grid container spacing={3} display="flex" justifyContent="center">
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="person_add"
              color="dark"
              title="Awarded Agency"
              description="Divide details about your product or agency work into parts. A paragraph describing a feature will be enough."
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="person_add"
              color="info"
              title="Awarded Agency"
              description="Divide details about your product or agency work into parts. A paragraph describing a feature will be enough."
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="person_add"
              color="secondary"
              title="Awarded Agency"
              description="Divide details about your product or agency work into parts. A paragraph describing a feature will be enough."
            />
          </MDBox>
        </Grid>
      </Grid>
      <Grid container mt={8} spacing={3}>
        <Grid item xs={12} md={9} lg={7}>
          <MDBox p={2} mx={10} display="flex" justifyContent="left">
            <MDBox
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="white"
              color="white"
              width="4rem"
              height="4rem"
              shadow="md"
              borderRadius="50%"
              variant="gradient"
            >
              <Icon fontSize="small" color="secondary">
                thumb_up
              </Icon>
            </MDBox>
          </MDBox>
          <MDBox p={2} mx={10} pb={2} px={2} textAlign="left" lineHeight={1.25}>
            <MDTypography variant="h3" fontWeight="medium" textTransform="capitalize">
              Working with us is a pleasure
            </MDTypography>
            <br />
            <MDTypography variant="h5" color="text" fontWeight="regular">
              Don't let your uses guess by attaching tooltips and popoves to any element. Just make
              sure you enable them first via JavaScript. The kit comes with three pre-built pages to
              help you get started faster. You can change the text and images and you're good to go.
              Just make sure you enable them first via JavaScript.
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={3} lg={4}>
          <MDBox mb={1.5}>
            <SimpleBlogCard
              image="https://bit.ly/3Hlw1MQ"
              action={{
                type: "internal",
                route: "/somewhere",
                color: "info",
                label: "Go Somewhere",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <Grid container mt={8} spacing={3}>
        <Grid item>
          <MDBox p={2} mx={10} pb={2} px={2} textAlign="center" lineHeight={1.25}>
            <MDTypography variant="h3" fontWeight="medium" textTransform="capitalize">
              Working with us is a pleasure
            </MDTypography>
            <br />
            <MDTypography variant="h5" color="text" fontWeight="regular">
              Don't let your uses guess by attaching tooltips and popoves to any element. Just make
              sure you enable them first via JavaScript. The kit comes with three pre-built pages to
              help you get started faster. You can change the text and images and you're good to go.
              Just make sure you enable them first via JavaScript.
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container mt={8} spacing={3}>
        <Grid item xs={12} md={3} lg={4}>
          <MDBox p={2} display="flex" justifyContent="center">
            <MDBox
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="white"
              color="white"
              width="4rem"
              height="4rem"
              shadow="md"
              borderRadius="50%"
              variant="gradient"
            >
              <Icon fontSize="small" color="secondary">
                thumb_up
              </Icon>
            </MDBox>
          </MDBox>
          <MDBox textAlign="center" lineHeight={1.25}>
            <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
              Working with us is a pleasure
            </MDTypography>
            <br />
            <MDTypography mx={4} variant="h6" color="text" fontWeight="regular">
              Don't let your uses guess by attaching tooltips and popoves to any element{" "}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={3} lg={4}>
          <MDBox p={2} display="flex" justifyContent="center">
            <MDBox
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="white"
              color="white"
              width="4rem"
              height="4rem"
              shadow="md"
              borderRadius="50%"
              variant="gradient"
            >
              <Icon fontSize="small" color="secondary">
                thumb_up
              </Icon>
            </MDBox>
          </MDBox>
          <MDBox textAlign="center" lineHeight={1.25}>
            <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
              Working with us is a pleasure
            </MDTypography>
            <br />
            <MDTypography mx={4} variant="h6" color="text" fontWeight="regular">
              Don't let your uses guess by attaching tooltips and popoves to any element{" "}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={3} lg={4}>
          <MDBox p={2} display="flex" justifyContent="center">
            <MDBox
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="white"
              color="white"
              width="4rem"
              height="4rem"
              shadow="md"
              borderRadius="50%"
              variant="gradient"
            >
              <Icon fontSize="small" color="secondary">
                thumb_up
              </Icon>
            </MDBox>
          </MDBox>
          <MDBox textAlign="center" lineHeight={1.25}>
            <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
              Working with us is a pleasure
            </MDTypography>
            <br />
            <MDTypography mx={4} variant="h6" color="text" fontWeight="regular">
              Don't let your uses guess by attaching tooltips and popoves to any element{" "}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={3} lg={4}>
          <MDBox p={2} display="flex" justifyContent="center">
            <MDBox
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="white"
              color="white"
              width="4rem"
              height="4rem"
              shadow="md"
              borderRadius="50%"
              variant="gradient"
            >
              <Icon fontSize="small" color="secondary">
                thumb_up
              </Icon>
            </MDBox>
          </MDBox>
          <MDBox textAlign="center" lineHeight={1.25}>
            <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
              Working with us is a pleasure
            </MDTypography>
            <br />
            <MDTypography mx={4} variant="h6" color="text" fontWeight="regular">
              Don't let your uses guess by attaching tooltips and popoves to any element{" "}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={3} lg={4}>
          <MDBox p={2} display="flex" justifyContent="center">
            <MDBox
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="white"
              color="white"
              width="4rem"
              height="4rem"
              shadow="md"
              borderRadius="50%"
              variant="gradient"
            >
              <Icon fontSize="small" color="secondary">
                thumb_up
              </Icon>
            </MDBox>
          </MDBox>
          <MDBox textAlign="center" lineHeight={1.25}>
            <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
              Working with us is a pleasure
            </MDTypography>
            <br />
            <MDTypography mx={4} variant="h6" color="text" fontWeight="regular">
              Don't let your uses guess by attaching tooltips and popoves to any element{" "}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={3} lg={4}>
          <MDBox p={2} display="flex" justifyContent="center">
            <MDBox
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="white"
              color="white"
              width="4rem"
              height="4rem"
              shadow="md"
              borderRadius="50%"
              variant="gradient"
            >
              <Icon fontSize="small" color="secondary">
                thumb_up
              </Icon>
            </MDBox>
          </MDBox>
          <MDBox textAlign="center" lineHeight={1.25}>
            <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
              Working with us is a pleasure
            </MDTypography>
            <br />
            <MDTypography mx={4} variant="h6" color="text" fontWeight="regular">
              Don't let your uses guess by attaching tooltips and popoves to any element{" "}
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
      <Grid mt={8}>
      <MDBox
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          px={1.5}
        >
        <MDBox
        mx={20}textAlign="left"
            display="flex"
            flexWrap="wrap"
            color="text"
            fontSize={size.sm}
          >
            &copy; {new Date().getFullYear()}, made with
          </MDBox>
      <MDBox
            component="ul"
            sx={({ breakpoints }) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          >
        <MDBox component="li" pr={2} lineHeight={1}>
        <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="dark"
                >
                  Creative Tim
                </MDTypography>
            </MDBox>
            <MDBox component="li" pr={2} lineHeight={1}>
        <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="dark"
                >
                  About Us
                </MDTypography>
            </MDBox>
            <MDBox component="li" pr={2} lineHeight={1}>
        <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="dark"
                >
                  License
                </MDTypography>
            </MDBox>
        </MDBox>
        </MDBox>
      </Grid>
    </HomeLayout>
  );
}
