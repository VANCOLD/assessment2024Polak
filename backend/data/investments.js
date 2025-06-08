const investmentsByProject = {};

function getNextId(projectId) {
  const investments = investmentsByProject[projectId] || [];
  if (investments.length === 0) return 1;


  const maxId = investments.reduce((max, inv) => (inv.id > max ? inv.id : max), 0);
  return maxId + 1;
}

function getInvestments(projectId) {
  if (projectId) {
    return investmentsByProject[projectId] || [];
  }

  return Object.values(investmentsByProject).flat();
}

function addInvestment(data) {
  if (!data.projectId) throw new Error("projectId required");
  const id = getNextId(data.projectId);
  const newInvestment = {
    ...data,
    id,
  };
  if (!investmentsByProject[data.projectId]) {
    investmentsByProject[data.projectId] = [];
  }
  investmentsByProject[data.projectId].push(newInvestment);
  return newInvestment;
}

function updateInvestment(data) {
  if (typeof data.id !== 'number' || !data.projectId) throw new Error("id (number) and projectId required");
  const list = investmentsByProject[data.projectId];
  if (!list) throw new Error("Project not found");
  const index = list.findIndex((inv) => inv.id === data.id);
  if (index === -1) throw new Error("Investment not found");
  list[index] = { ...list[index], ...data };
  return list[index];
}

module.exports = {
  getInvestments,
  addInvestment,
  updateInvestment,
};
