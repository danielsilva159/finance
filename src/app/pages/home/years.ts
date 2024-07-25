export default class Years {
  config() {
    const data = new Date();
    const ano = data.getFullYear();
    const anos = [ano - 3, ano - 2, ano - 1, ano, ano + 1, ano + 2, ano + 3];

    return anos;
  }
}
