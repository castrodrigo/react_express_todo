import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "nav": {
        "backgroundColor": "#1e5799"
    },
    "brand-logo": {
        "marginLeft": 20
    },
    "alert": {
        "paddingTop": 20,
        "paddingRight": 20,
        "paddingBottom": 20,
        "paddingLeft": 20,
        "marginBottom": 20
    },
    "alert-danger": {
        "backgroundColor": "#FF5F49"
    },
    "error": {
        "color": "#FF5F49"
    }
});