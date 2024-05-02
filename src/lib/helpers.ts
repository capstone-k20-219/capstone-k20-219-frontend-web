import { VehicleTypeData } from "./type";

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
  return newPhone.length > 0 && phoneRegex.test(newPhone);
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

function validateDob(dob: string) {}

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

function sortVehicleTypesById(arr: VehicleTypeData[]): VehicleTypeData[] {
  return arr.sort((a, b) => a.id.localeCompare(b.id));
}

function validateKeyword(key: string) {
  const newKey = eliminateSpecialChars(key);

  return newKey.toLowerCase();
}

export {
  validateEmail,
  validatePhone,
  validateName,
  validatePasswordSignup,
  validatePassword,
  validateVehicleTypeID,
  validateFee,
  sortVehicleTypesById,
  validateKeyword,
};
