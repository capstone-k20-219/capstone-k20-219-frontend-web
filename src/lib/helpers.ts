import {
  BLOCK_SIZE,
  Coordinate,
  ServiceDBGetType,
  ServicePrices,
  UserDBGetType,
  VehicleTypeData,
} from "./type";

const eliminateSpecialChars = (input: string) => {
  const map: {
    [key: string]: string;
  } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  input = input
    .trim()
    .replace(/\\/g, "")
    .replace(/[&<>"']/g, (m) => map[m]);
  return input;
};

function validateEmail(email: string) {
  const newEmail = eliminateSpecialChars(email);
  if (!newEmail) {
    return {
      valid: false,
      message: "Email field cannot be empty.",
      data: newEmail,
    };
  }

  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;

  if (!emailRegex.test(newEmail)) {
    return {
      valid: false,
      message: "Please enter a valid email address.",
      data: newEmail,
    };
  }

  return {
    valid: true,
    message: "",
    data: newEmail,
  };
}

function validatePhone(phone: string) {
  const newPhone = eliminateSpecialChars(phone);
  const phoneRegex = /^\d{10}$/;
  if (newPhone.length === 0) {
    return {
      valid: false,
      message: "Phone number field cannot be empty.",
      data: newPhone,
    };
  }
  if (!phoneRegex.test(newPhone)) {
    return {
      valid: false,
      message: "Phone number should be in format of 10 digits.",
      data: newPhone,
    };
  }
  return {
    valid: true,
    message: "",
    data: newPhone,
  };
}

function validateName(name: string) {
  const newName = eliminateSpecialChars(name);
  if (newName.length > 0) {
    return {
      valid: true,
      message: "",
      data: newName,
    };
  }
  return {
    valid: false,
    message: "Name field cannot be empty.",
    data: newName,
  };
}

function validatePasswordSignup(pass: string, confirmPass: string) {
  const newPass = eliminateSpecialChars(pass);
  const newConfirmPass = eliminateSpecialChars(confirmPass);

  return newPass === newConfirmPass && newPass.length > 8;
}

function validatePassword(pass: string) {
  const newPass = eliminateSpecialChars(pass);

  if (!newPass) {
    return {
      valid: false,
      message: "Password field cannot be empty.",
      data: newPass,
    };
  }

  if (newPass.length < 8) {
    return {
      valid: false,
      message: "Password should not be less than 8 character.",
      data: newPass,
    };
  }

  return {
    valid: true,
    message: "",
    data: newPass,
  };
}

// check if dob in format of yyyy-mm-dd
function checkDobFormat(dob: string) {
  // First check for the pattern
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    return false;
  }

  // Parse the date parts to integers
  const [year, month, day] = dob.split("-").map(Number);

  // Create a new Date object and check if it's valid
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

// validate if dob in format of yyyy-mm-dd
function validateDob(dob: string) {
  const newDob = eliminateSpecialChars(dob);
  if (!newDob) {
    return {
      valid: false,
      message: "Date of birth cannot be empty.",
      data: dob,
    };
  }
  if (checkDobFormat(newDob)) {
    return {
      valid: true,
      message: "",
      data: newDob,
    };
  } else {
    return {
      valid: false,
      message: `Invalid date format: ${newDob}`,
      data: newDob,
    };
  }
}

function validateVehicleTypeID(vehicleTypeId: string) {
  const newID = eliminateSpecialChars(vehicleTypeId).toUpperCase();
  if (newID.length === 3) {
    return {
      valid: true,
      message: "",
      data: newID,
    };
  } else {
    return {
      valid: false,
      message: "Vehicle type ID must be 3 characters.",
      data: newID,
    };
  }
}

function validateFee(fee: number) {
  if (fee < 0) {
    return {
      valid: false,
      message: "Fee is number and cannot be less than 0",
      data: fee,
    };
  }
  return {
    valid: true,
    message: "",
    data: fee,
  };
}

function validateKeyword(key: string) {
  const newKey = eliminateSpecialChars(key);
  return newKey.toLowerCase();
}

function sortVehicleTypesById(arr: VehicleTypeData[]): VehicleTypeData[] {
  return arr.sort((a, b) => a.id.localeCompare(b.id));
}

function sortServiceById(arr: ServiceDBGetType[]): ServiceDBGetType[] {
  return arr.sort((a, b) => a.id.localeCompare(b.id));
}

function sortEmployeeById(arr: UserDBGetType[]): UserDBGetType[] {
  return arr.sort((a, b) => a.id.localeCompare(b.id));
}

function filterUniqueInfoService(array: ServicePrices[]) {
  const result: ServicePrices[] = [];
  const map = new Map();
  for (const item of array) {
    if (!map.has(item.typeId)) {
      map.set(item.typeId, true); // set any value to Map
      result.push(item);
    }
  }
  return result;
}

function validatePricesOfService(prices: ServicePrices[]) {
  const filteredPrices = filterUniqueInfoService(prices);
  let valid: boolean = true;
  let message: string = "";
  for (let index = 0; index < filteredPrices.length; index++) {
    const validTypeId = validateVehicleTypeID(filteredPrices[index].typeId);
    if (!validTypeId.valid) {
      valid = false;
      message += `Invalid typeId in price ${index + 1}: ${validTypeId.message}`;
      break;
    }
    const validUnitPrice = validateFee(filteredPrices[index].unitPrice);
    if (!validUnitPrice.valid) {
      valid = false;
      message += `Invalid unitPrice in price ${index + 1}: ${
        validUnitPrice.message
      }`;
      break;
    }
    filteredPrices[index] = {
      typeId: validTypeId.data,
      unitPrice: validUnitPrice.data,
    };
  }

  return {
    valid: valid,
    message: message,
    data: filteredPrices,
  };
}
// format like "2024-05-03T14:26:14.592Z" -> dd/mm/yyyy
function formatValueDateString(s: string) {
  let reFormattedDate = s.slice(0, 10).split("-");
  return reFormattedDate.reverse().join("/");
}

// change date from dd/mm/yyyy -> yyyy-mm-dd for input value
function formatInputDateString(s: string) {
  if (checkDobFormat(s)) {
    return s;
  }
  let reFormattedDate = s.split("/");
  return reFormattedDate.reverse().join("-");
}

function validateCoordinate(coordinate: Coordinate) {
  const { x_start, y_start, x_end, y_end } = coordinate;
  if (x_start < 0 || x_end < 0 || y_end < 0 || y_start < 0) {
    return {
      valid: false,
      message: "Coordinates cannot be negative.",
      data: null,
    };
  }

  if (
    Math.abs(x_start - x_end) < BLOCK_SIZE ||
    Math.abs(y_start - y_end) < BLOCK_SIZE
  ) {
    return {
      valid: false,
      message: `The smallest unit of a slot is ${BLOCK_SIZE}px`,
      data: null,
    };
  }

  return {
    valid: true,
    message: "",
    data: null,
  };
}

export {
  eliminateSpecialChars,
  validateEmail,
  validatePhone,
  validateName,
  validateDob,
  validatePasswordSignup,
  validatePassword,
  validateVehicleTypeID,
  validateFee,
  sortVehicleTypesById,
  validateKeyword,
  sortServiceById,
  filterUniqueInfoService,
  validatePricesOfService,
  sortEmployeeById,
  formatValueDateString,
  formatInputDateString,
  validateCoordinate,
};
