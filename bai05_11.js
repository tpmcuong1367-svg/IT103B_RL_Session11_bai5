const devices = [
  { id: "DEV01", name: "Điều hòa", powerWatts: 1500, isActive: true },
  { id: "DEV02", name: "Quạt", powerWatts: 60, isActive: true },
  { id: "DEV03", name: "Đèn", powerWatts: 40, isActive: true },
];

const findDeviceById = (list, id) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) return list[i];
  }
  return null;
};

const updateDeviceState = (list, id, updatedData) => {
  const device = findDeviceById(list, id);
  if (device === null) return false;
  if (updatedData === null || typeof updatedData !== "object") return false;

  if (updatedData.isActive !== undefined) {
    device.isActive = updatedData.isActive;
  }
  if (updatedData.powerWatts !== undefined) {
    device.powerWatts = updatedData.powerWatts;
  }
  return true;
};

const calculateActivePower = (list) => {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].isActive) {
      total += list[i].powerWatts;
    }
  }
  return total;
};

const printDevices = (title, list) => {
  console.log(title);
  for (let i = 0; i < list.length; i++) {
    const d = list[i];
    console.log("  " + d.id + " | " + d.name + " | " + d.powerWatts + "W | isActive = " + d.isActive);
  }
};

printDevices("=== TRƯỚC KHI CẬP NHẬT ===", devices);
console.log("Tổng công suất trước:", calculateActivePower(devices) + "W");

console.log("\n=== THỰC HIỆN CẬP NHẬT ===");
console.log("Tắt DEV01:", updateDeviceState(devices, "DEV01", { isActive: false }));
console.log("Hạ DEV03 về 0W:", updateDeviceState(devices, "DEV03", { powerWatts: 0 }));
console.log("Cập nhật ID không tồn tại (DEV99):", updateDeviceState(devices, "DEV99", { isActive: false }));

console.log("\n");
printDevices("=== SAU KHI CẬP NHẬT ===", devices);
const totalAfter = calculateActivePower(devices);
console.log("Tổng công suất sau:", totalAfter + "W");
console.log("Kiểm tra đúng 60W:", totalAfter === 60 ? "ĐẠT" : "KHÔNG ĐẠT");