import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('tipos-evento', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("debe navegar a la seccion de tipos de evento y estar los componentes",()=>{
    page.navigateTo();
    page.getNavegacionTipoEventos().click();
    

    expect(page.getTituloTipoEventos().getText()).toEqual("Listado de tipos de evento");
    expect(page.getBotonCrearTipoEvento().getText()).toEqual("Añadir tipo de evento");
    expect(page.getBotonCrearTipoEvento()).toBeTruthy();
  })

  it("debe crear un nuevo tipo de evento", ()=>{
    let competicion = "Dakar"
    page.navigateTo();
    page.getNavegacionTipoEventos().click();
    page.getBotonCrearTipoEvento().click();
    page.getSelectorDeporteTipoEvento().sendKeys("MotorSport");
  
    page.getInputCompeticion().sendKeys(competicion);
    page.getInputFechaInicio().sendKeys("2020-10-07T00:00:00")
      .then(response => page.getInputFechaFin().sendKeys("2020-10-29T00:00:00"));
    page.pausar();
    page.getBtnCrearGuardar().click();
    page.getBtnVolver().click();
    let textoCompeticion = page.getTiposEventoRows().get(-1).getText().then(response => response.split(" ")[1]);
    page.pausar();
    expect(textoCompeticion).toEqual(competicion);
  })

  it("debe modificar un tipo de evento", () => {
    page.navigateTo();
    page.getNavegacionTipoEventos().click();
    let textoCompeticionModificado = page.getTiposEventoRows().get(-1).getText().then(response => response.split(" ")[1]);
    page.getTiposEventoRows().get(-1).click();
    page.pausar();
    page.getInputCompeticion().clear();
    page.getInputCompeticion().sendKeys("NBA");
    page.getBtnCrearGuardar().click();
    page.getBtnVolver().click();
    let textoCompeticion = page.getTiposEventoRows().get(-1).getText().then(response => response.split(" ")[1]);
    page.pausar();
    expect(textoCompeticion).not.toBe(textoCompeticionModificado)
    expect(textoCompeticion).toBe("NBA");

  })

  it("debe borrar un tipo de evento", () => {
    page.navigateTo();
    page.getNavegacionTipoEventos().click();
    let numRowsBorrar;
    
    numRowsBorrar = page.getTiposEventoRows().count().then(num => num);

    page.getTiposEventoRows().get(-1).click().then(()=>{
      page.getBtnBorrar().click()
        .then(() => page.getBtnConfirmarModal().click())
    })
    page.pausar();

    let numRows;

    numRows = page.getTiposEventoRows().count().then(num => num);

    expect(numRows).not.toBe(numRowsBorrar);
  })

  



  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
