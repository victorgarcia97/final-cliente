import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    browser.driver.manage().window().maximize();
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getNavegacionInicio(){
    return element(by.id("navInicio"));
  }

  getNavegacionTipoEventos(){
    return element(by.id("navTipoEventos"));
  }

  getNavegacionTipoApuestas(){
    return element(by.id("navTipoApuestas"));
  }

  getTituloTipoEventos(){
    return element(by.id("tituloTipoEventos"));
  }

  getTiposEventoRows(){
    return element.all(by.id("tipoEventoRow"));
  }

  getBotonCrearTipoEvento(){
    return element(by.id("btnCrearTipoEvento"));
  }

  getSelectorDeporteTipoEvento(){
    return element(by.id("selectorDeporte"));
  }

  getInputCompeticion(){
    return element(by.id("inputCompeticion"));
  }

  getInputFechaInicio(){
    return element(by.id("inputFechaInicio"));
  }

  getInputFechaFin(){
    return element(by.id("inputFechaFin"));
  }

  getInputDescripcion(){
    return element(by.id("inputDescripcion"));
  }

  getBtnVolver(){
    return element(by.id("btnVolver"));
  }

  getBtnCrearGuardar(){
    return element(by.id("btnCrearGuardar"));
  }

  getBtnBorrar(){
    return element(by.id("btnBorrar"));
  }

  getBtnConfirmarModal(){
    return element(by.id("btnConfirmarModal"));
  }


  pausar(){
    browser.sleep(500);
  }

}
