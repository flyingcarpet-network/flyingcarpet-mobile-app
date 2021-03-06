/*
 * This action file is for dispatching actions to the general app information reducer
 */

import * as types from './business-types';

export function reset() {
  return {
    type: types.RESET
  };
}

export function setBusinessType(businessType) {
  return {
    type: types.SET_BUSINESS_TYPE,
    businessType
  };
}

export function addLocationCoordinate(uniqueIdentifier, locationCoordinate) {
  return {
    type: types.ADD_LOCATION_COORDINATE,
    uniqueIdentifier,
    locationCoordinate
  };
}

export function removeLocationCoordinate(uniqueIdentifier) {
  return {
    type: types.REMOVE_LOCATION_COORDINATE,
    uniqueIdentifier
  };
}

export function setAltitute(altitute) {
  return {
    type: types.SET_ALTITUTE,
    altitute
  };
}

export function setFlightDirection(flightDirection) {
  return {
    type: types.SET_FLIGHT_DIRECTION,
    flightDirection
  };
}

export function toggleOption(option) {
  return {
    type: types.TOGGLE_OPTION,
    option
  };
}

export function setEthCost(ethCost) {
  return {
    type: types.SET_ETH_COST,
    ethCost
  };
}

export function setBusinessTransactionProcessing(businessTransactionProcessing) {
  return {
    type: types.SET_BUSINESS_TRANSACTION_PROCESSING,
    businessTransactionProcessing
  };
}

export function toggleMapOpen() {
  return {
    type: types.TOGGLE_MAP_OPEN
  };
}
