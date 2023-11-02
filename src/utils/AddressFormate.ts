export const formatCustomAddress = (
  addressComponents: any,
  setAddress: any,
  latLng: any
) => {
  let formattedAddress = "";
  const streetNumber = addressComponents.find((component: any) =>
    component.types.includes("street_number")
  );

  const route = addressComponents.find((component: any) =>
    component.types.includes("route")
  );

  const landMark = addressComponents.find((component: any) =>
    component.types.includes("landmark")
  );

  const city = addressComponents.find((component: any) =>
    component.types.includes("locality")
  );

  const state = addressComponents.find((component: any) =>
    component.types.includes("administrative_area_level_1")
  );

  const postalCode = addressComponents.find((component: any) =>
    component.types.includes("postal_code")
  );

  if (streetNumber) formattedAddress += streetNumber.long_name + " ";
  if (landMark) formattedAddress += landMark.long_name + ", ";
  if (route) formattedAddress += route.long_name + " ";
  // if (city) formattedAddress += city.long_name + ", ";
  // if (state) formattedAddress += state.short_name + " ";
  // if (postalCode) formattedAddress += postalCode.long_name;
  setAddress({
    id: "",
    customerId: "",
    addressId: 0,
    name: "",
    mobile: "",
    email: "",
    addressName: "",
    flatNo: "",
    buildingName: "",
    address2: "",
    countryId: "",
    country: "",
    stateId: "",
    cityId: "",
    locality: "",
    localityId: "",
    latitude: latLng?.lat,
    longitude: latLng?.lng,
    defaultAddress: false,
    societyId: "",
    pincode: postalCode ? postalCode.long_name : "",
    address1:
      streetNumber && route
        ? `${streetNumber.long_name},${route.long_name}`
        : streetNumber
        ? streetNumber.long_name
        : route
        ? route.long_name
        : "",
    landmark: landMark ? landMark.long_name : "",
    city: city ? city.long_name : "",
    state: state ? state.long_name : "",
  });
  return formattedAddress;
};
