/* Reparación AEG Valladolid — app.js (JS puro, sin dependencias, sin peticiones externas) */
(function () {
  'use strict';
  var CONFIG = {
    TEL: '641 153 922', TEL_HREF: 'tel:+34641153922',
    WA: '641 153 922', WA_BASE: 'https://wa.me/34641153922?text=', PRECIO: '60,50 €',
    MARCA: 'AEG', MARCA_RE: /\b(AEG|ELECTROLUX|ZANUSSI)\b/g, SAT_TXT: '<a href="https://support.aeg.com.es/repairs/information" rel="nofollow noopener" target="_blank">support.aeg.com.es</a> · 911 178 909', ETIQUETA: 'código PNC', F_ES_E: false,
    FORM_ENDPOINT: '' /* vacío = envío por WhatsApp (canal citado en Privacidad); si se activa un proveedor, actualizar Privacidad */
  };
  var CODIGOS=[{"id":"e10-lavadora","cod":"E10 / E11 / C1","ap":"lavadora","keys":["E10","E11","C1"],"titulo":"No entra agua","sig":"La lavadora no recibe agua o recibe poca. Sin pantalla: 1 pitido o C1.","pasos":["Abrir el grifo del todo y comprobar que sale agua con presión","Limpiar el filtro de la manguera de entrada y estirar la manguera","Comprobar que la manguera de desagüe no entra más de 10 cm en el sifón","Desenchufar 30 segundos y reiniciar"],"sem":"verde","llamar":"Con agua, filtros limpios y sin dobleces sigue igual → electroválvula o presostato."},{"id":"e20-lavadora","cod":"E20 / C2","ap":"lavadora","keys":["E20","C2"],"titulo":"No desagua","sig":"La lavadora no vacía el agua: filtro o bomba de desagüe. Sin pantalla: 2 pitidos o C2.","pasos":["Limpiar el filtro de la bomba (abajo a la derecha, con toalla y recipiente)","Comprobar que la manguera de desagüe no está aplastada y sale a 60–100 cm de altura","Usar menos detergente en el siguiente lavado","Si la bomba ha trabajado mucho, apagar una o dos horas para que se enfríe"],"sem":"verde","llamar":"Filtro limpio, manguera bien y persiste → bomba de desagüe."},{"id":"e30-lavadora","cod":"E30 / C3","ap":"lavadora","keys":["E30","C3"],"titulo":"Sensor de nivel de agua","sig":"Fallo del sensor de presión (presostato); en modelos antiguos puede indicar fuga. Sin pantalla: 3 pitidos o C3.","pasos":["Desenchufar 1 minuto y reiniciar"],"sem":"ambar","llamar":"Siempre que reaparezca → presostato o fuga interna."},{"id":"e40-lavadora","cod":"E40","ap":"lavadora","keys":["E40"],"titulo":"Puerta mal cerrada","sig":"La puerta no está bien cerrada o el cierre no la detecta. Sin pantalla: 4 pitidos.","pasos":["Empujar la puerta hasta oír el clic","Sacar la ropa pillada en la goma y quitar parte de la carga si va muy llena","Desactivar el bloqueo infantil si está activo"],"sem":"verde","llamar":"Con la puerta bien cerrada persiste → cierre (blocapuertas)."},{"id":"e50-lavadora","cod":"E50 / C9 / F9","ap":"lavadora","keys":["E50","C9","F9"],"titulo":"Motor o su control","sig":"Fallo del motor o del módulo que lo gobierna. AEG indica no seguir usándola.","pasos":[],"sem":"ambar","llamar":"Siempre: desenchufa y llama → motor, escobillas o módulo de control."},{"id":"e60-lavadora","cod":"E60 / E61 / E62","ap":"lavadora","keys":["E60","E61","E62","E69"],"titulo":"No calienta","sig":"Fallo en el calentamiento del agua: resistencia, sonda o relé.","pasos":[],"sem":"ambar","llamar":"Siempre → resistencia, sonda NTC o relé de la placa."},{"id":"e70-lavadora","cod":"E70","ap":"lavadora","keys":["E70"],"titulo":"Sonda de temperatura","sig":"La sonda NTC que mide la temperatura del agua da una lectura fuera de rango.","pasos":[],"sem":"ambar","llamar":"Siempre → sonda de temperatura."},{"id":"e80-lavadora","cod":"E80","ap":"lavadora","keys":["E80"],"titulo":"Selector de programas","sig":"Fallo del selector o de la electrónica que lo lee.","pasos":["Desenchufar 1 minuto y reiniciar"],"sem":"ambar","llamar":"Si repite tras el reinicio → placa o selector."},{"id":"e90-lavadora","cod":"E90 / E91 / E92 / E93 / E94","ap":"lavadora","keys":["E90","E91","E92","E93","E94"],"titulo":"Electrónica / comunicación","sig":"Fallo de comunicación entre la placa de control y el panel, o de configuración de la placa.","pasos":["Desenchufar 1 minuto y reiniciar"],"sem":"ambar","llamar":"Si repite tras el reinicio → placa de control."},{"id":"ef0-lavadora","cod":"EF0 / EFo / EF3","ap":"lavadora","keys":["EF0","EFO","EF3"],"titulo":"Agua en la base o espuma","sig":"Sistema antiinundación: fuga, exceso de espuma o carga muy desequilibrada. Sin pantalla: 15 pitidos.","pasos":["Poner menos detergente y limpiar el cajetín","Sacar la ropa pillada en la goma y revisar que la goma no tiene grietas","Inclinar ligeramente hacia atrás para vaciar la base y limpiar el filtro","Revisar las mangueras de entrada y sus racores"],"sem":"ambar","llamar":"Si reaparece con poco detergente → fuga interna (bomba, manguitos, cuba)."},{"id":"eh0-lavadora","cod":"EH0 / EHO","ap":"lavadora","keys":["EH0","EHO"],"titulo":"Suministro eléctrico","sig":"Tensión o frecuencia de red fuera de rango: tormentas, regletas, enchufes en mal estado. Muchas veces no es avería.","pasos":["Desenchufar 20 minutos y volver a enchufar","Enchufar directo a la pared, sin regleta ni alargador","Comprobar que otros aparatos de la casa funcionan con normalidad"],"sem":"verde","llamar":"Si repite con la red estable → filtro antiparasitario o placa."},{"id":"eb0-lavadora","cod":"Eb0 / Ebo","ap":"lavadora","keys":["EB0","EBO"],"titulo":"Tensión de red baja","sig":"La lavadora detecta una tensión de red demasiado baja. Sin pantalla: 11 pitidos.","pasos":["Desenchufar 20 minutos y volver a enchufar","Enchufar directo a la pared, sin regleta"],"sem":"verde","llamar":"Si repite con la red estable → placa de control."},{"id":"e10-lavasecadora","cod":"E10 / E11 / C1","ap":"lavasecadora","keys":["E10","E11","C1"],"titulo":"No entra agua","sig":"La lavasecadora no recibe agua o recibe poca (mismo código que la lavadora). Sin pantalla: 1 pitido o C1.","pasos":["Abrir el grifo del todo y comprobar que sale agua con presión","Limpiar el filtro de la manguera de entrada y estirar la manguera","Desenchufar 30 segundos y reiniciar"],"sem":"verde","llamar":"Con agua y filtros limpios sigue igual → electroválvula o presostato."},{"id":"e20-lavasecadora","cod":"E20 / C2","ap":"lavasecadora","keys":["E20","C2"],"titulo":"No desagua","sig":"No vacía el agua: filtro o bomba de desagüe (mismo código que la lavadora). Sin pantalla: 2 pitidos o C2.","pasos":["Limpiar el filtro de la bomba (abajo a la derecha, con toalla y recipiente)","Comprobar que la manguera de desagüe no está aplastada y sale a 60–100 cm","Usar menos detergente en el siguiente lavado"],"sem":"verde","llamar":"Filtro limpio y persiste → bomba de desagüe."},{"id":"e40-lavasecadora","cod":"E40","ap":"lavasecadora","keys":["E40"],"titulo":"Puerta mal cerrada","sig":"La puerta no está bien cerrada o el cierre no la detecta. Sin pantalla: 4 pitidos.","pasos":["Empujar la puerta hasta oír el clic","Sacar la ropa pillada en la goma y reducir la carga","Desactivar el bloqueo infantil si está activo"],"sem":"verde","llamar":"Con la puerta bien cerrada persiste → cierre (blocapuertas)."},{"id":"e50-lavasecadora","cod":"E50 / C9 / F9","ap":"lavasecadora","keys":["E50","C9","F9"],"titulo":"Motor o su control","sig":"Fallo del motor o del módulo que lo gobierna. AEG indica no seguir usándola.","pasos":[],"sem":"ambar","llamar":"Siempre: desenchufa y llama → motor o módulo de control."},{"id":"e60-lavasecadora","cod":"E60 / E61 / E62","ap":"lavasecadora","keys":["E60","E61","E62","E69"],"titulo":"No calienta","sig":"Fallo en el calentamiento del agua de lavado: resistencia, sonda o relé.","pasos":[],"sem":"ambar","llamar":"Siempre → resistencia, sonda NTC o relé."},{"id":"ef0-lavasecadora","cod":"EF0 / EFo / EF3","ap":"lavasecadora","keys":["EF0","EFO","EF3"],"titulo":"Agua en la base o espuma","sig":"Antiinundación: fuga, exceso de espuma o carga desequilibrada. Sin pantalla: 15 pitidos.","pasos":["Poner menos detergente y limpiar el cajetín","Sacar la ropa pillada en la goma","Inclinar ligeramente hacia atrás para vaciar la base y limpiar el filtro"],"sem":"ambar","llamar":"Si reaparece con poco detergente → fuga interna."},{"id":"eh0-lavasecadora","cod":"EH0 / EHO","ap":"lavasecadora","keys":["EH0","EHO"],"titulo":"Suministro eléctrico","sig":"Tensión o frecuencia de red fuera de rango; a menudo tras una tormenta. Muchas veces no es avería.","pasos":["Desenchufar 20 minutos y volver a enchufar","Enchufar directo a la pared, sin regleta ni alargador"],"sem":"verde","llamar":"Si repite con la red estable → filtro antiparasitario o placa."},{"id":"i10-lavavajillas","cod":"i10 / i11 / AL5 / C1 / F1","ap":"lavavajillas","keys":["I10","I11","AL5","C1","F1"],"titulo":"No coge agua","sig":"Problema en la entrada de agua. Sin pantalla: 1 pitido, AL5, C1 o F1 según el modelo.","pasos":["Abrir el grifo del todo y que ningún otro aparato esté usando agua","Limpiar el filtro-malla del conector del grifo y estirar la manguera","En instalación nueva, comprobar que el tapón del sifón está retirado","Desenchufar 1 minuto y reiniciar"],"sem":"verde","llamar":"Con agua y filtro limpio persiste → electroválvula o aquastop."},{"id":"i20-lavavajillas","cod":"i20 / AL6 / C2 / F2","ap":"lavavajillas","keys":["I20","AL6","C2","F2"],"titulo":"No desagua","sig":"El lavavajillas no vacía el agua. Sin pantalla: 2 pitidos, AL6, C2 o F2 según el modelo.","pasos":["Limpiar los filtros interiores y el sumidero de la cuba","Comprobar que la manguera de desagüe no está aplastada y sale a 40–85 cm de altura","Comprobar que el sifón del fregadero no está atascado"],"sem":"verde","llamar":"Filtros limpios y sifón libre, persiste → bomba de desagüe."},{"id":"i30-lavavajillas","cod":"i30","ap":"lavavajillas","keys":["I30"],"titulo":"Agua en la base (antiinundación)","sig":"Hay agua en la bandeja inferior y la bomba no para: fuga en junta, brazos, filtros o cuba. Sin pantalla: 3 pitidos.","pasos":["Cerrar el grifo del agua","Inclinar el lavavajillas 45° hacia atrás para vaciar la base","Revisar la junta de la puerta, los filtros, los brazos y que la carga no bloquea nada"],"sem":"ambar","llamar":"Si vuelve en el siguiente ciclo → fuga interna."},{"id":"i40-lavavajillas","cod":"i40","ap":"lavavajillas","keys":["I40"],"titulo":"Sensor de nivel","sig":"Fallo del sensor de presión que mide el nivel de agua.","pasos":["Desenchufar 1 minuto y reiniciar"],"sem":"ambar","llamar":"Siempre que reaparezca → sensor de presión."},{"id":"i50-lavavajillas","cod":"i50","ap":"lavavajillas","keys":["I50"],"titulo":"Bomba de lavado","sig":"Fallo del motor de la bomba de lavado o de su control.","pasos":[],"sem":"ambar","llamar":"Siempre → bomba de lavado o módulo."},{"id":"i60-lavavajillas","cod":"i60","ap":"lavavajillas","keys":["I60"],"titulo":"No calienta","sig":"Fallo en el calentamiento del agua: no lava caliente ni seca.","pasos":["Comprobar que el agua de entrada no supera los 60 °C","Desenchufar 1 minuto y reiniciar","Tras una mudanza, comprobar que los tubos no están retorcidos"],"sem":"ambar","llamar":"Si persiste → resistencia o bomba de calor."},{"id":"if0-lavavajillas","cod":"iF0 / iF1","ap":"lavavajillas","keys":["IF0","IF1"],"titulo":"Nivel de agua incorrecto","sig":"El llenado tarda demasiado o el nivel no es el esperado; suele venir de la entrada de agua.","pasos":["Abrir el grifo del todo y limpiar el filtro-malla del conector","Estirar la manguera de entrada y reiniciar"],"sem":"ambar","llamar":"Si persiste → caudalímetro o electroválvula."},{"id":"ic0-lavavajillas","cod":"iC0 / iC1 / iC2 / iC3","ap":"lavavajillas","keys":["IC0","IC1","IC2","IC3"],"titulo":"Comunicación placa–panel","sig":"Fallo de comunicación entre la electrónica de potencia y el panel de mandos.","pasos":["Desenchufar 1 minuto y reiniciar"],"sem":"ambar","llamar":"Si repite tras el reinicio → electrónica."},{"id":"e20-secadora","cod":"E20 / C2","ap":"secadora","keys":["E20","C2"],"titulo":"No vacía el agua de condensación","sig":"La bomba o la manguera de condensados no evacúan el agua; suele mostrarse como depósito lleno.","pasos":["Vaciar el depósito de agua","Comprobar que la manguera trasera no tiene dobleces","Limpiar la zona de la bomba de condensados (parte baja)","Desenchufar 30 segundos y reiniciar"],"sem":"verde","llamar":"Depósito vacío y manguera bien, persiste → bomba de condensados."},{"id":"e40-secadora","cod":"E40","ap":"secadora","keys":["E40"],"titulo":"Puerta abierta o cierre","sig":"La secadora no detecta la puerta cerrada.","pasos":["Cerrar la puerta hasta oír el clic","Sacar la ropa pillada en la junta"],"sem":"verde","llamar":"Con la puerta bien cerrada persiste → cierre."},{"id":"e50-secadora","cod":"E50","ap":"secadora","keys":["E50"],"titulo":"Motor o software","sig":"Fallo del motor, de su condensador de arranque o del programa de control.","pasos":["Desenchufar 30 segundos (o 30 minutos si está caliente) y reiniciar"],"sem":"ambar","llamar":"Si persiste → motor, condensador de arranque o relé."},{"id":"e60-secadora","cod":"E60","ap":"secadora","keys":["E60"],"titulo":"No calienta","sig":"Fallo de calentamiento; muy a menudo es falta de ventilación o suciedad, no avería.","pasos":["Limpiar los filtros de la puerta, el del condensador y la junta","Secar en una habitación de más de 10–12 m², con la puerta o ventana abierta","No usarla encajada en un armario cerrado"],"sem":"verde","llamar":"Limpia, ventilada y persiste → resistencia o bomba de calor."},{"id":"e70-secadora","cod":"E70","ap":"secadora","keys":["E70"],"titulo":"Sensor de temperatura","sig":"La sonda NTC de temperatura da una lectura fuera de rango.","pasos":[],"sem":"ambar","llamar":"Siempre → sonda de temperatura."},{"id":"e80-secadora","cod":"E80","ap":"secadora","keys":["E80"],"titulo":"Selector o software","sig":"Fallo del selector de programas o del programa de control.","pasos":["Desenchufar 1 minuto y reiniciar"],"sem":"ambar","llamar":"Si persiste → selector o placa."},{"id":"eh0-secadora","cod":"EH0 / EHO","ap":"secadora","keys":["EH0","EHO"],"titulo":"Suministro eléctrico","sig":"Tensión o frecuencia de red fuera de rango; habitual tras tormentas o con regletas.","pasos":["Desenchufar 20 minutos y volver a enchufar","Enchufar directo a la pared, sin regleta ni alargador"],"sem":"verde","llamar":"Si repite con la red estable → filtro antiparasitario o placa."},{"id":"c6-secadora","cod":"C6","ap":"secadora","keys":["C6"],"titulo":"Sensor de humedad","sig":"Las barras del sensor de humedad del tambor no leen bien; ciclos larguísimos o ropa que sale húmeda.","pasos":["Limpiar las barras metálicas del sensor del tambor con un paño y vinagre","No meter la ropa empapada: centrifugar bien antes"],"sem":"verde","llamar":"Limpio y persiste (ciclos de más de 4,5 h) → sensor de humedad."},{"id":"c8-secadora","cod":"C8","ap":"secadora","keys":["C8"],"titulo":"Sonda de temperatura","sig":"Fallo de la sonda de temperatura en modelos con códigos C.","pasos":["Desenchufar 1 minuto y reiniciar"],"sem":"ambar","llamar":"Siempre que reaparezca → sonda."},{"id":"cd-secadora","cod":"CD / CE / CF","ap":"secadora","keys":["CD","CE","CF"],"titulo":"Cierre de puerta o electrónica","sig":"Fallo del cierre de puerta o de la electrónica en modelos con códigos C.","pasos":[],"sem":"ambar","llamar":"Siempre: desenchufa y llama → cierre o placa."},{"id":"e01-frigorifico","cod":"E01 / E02 / E03 / E06 / E07","ap":"frigorifico","keys":["E01","E02","E03","E06","E07","E1","E2","E3"],"titulo":"Advertencia de sensor","sig":"Aviso de un sensor de temperatura; E02 en algunos modelos es tensión baja (< 170 V) y E03, que el congelador no llega a temperatura.","pasos":["Comprobar si ha habido un corte de luz reciente y que las puertas cierran bien","Si acaba de arrancar o se ha cargado mucho producto fresco, esperar un día entero","Desactivar Frostmatic o Coolmatic si estaban activos y reiniciar desde el cuadro 1 minuto"],"sem":"ambar","llamar":"Si persiste pasado un día → AEG indica solicitar la visita de un técnico."},{"id":"f1-frigorifico","cod":"F1 / F2","ap":"frigorifico","keys":["F1","F2"],"titulo":"Termostato o sensor","sig":"Fallo del termostato electrónico o de un sensor de temperatura.","pasos":[],"sem":"ambar","llamar":"Siempre → termostato o sensor; no esperes a que suba la temperatura."},{"id":"alarma-frigorifico","cod":"Alarma / temperatura parpadeando","ap":"frigorifico","keys":["ALARMA","PITA","PARPADEA"],"titulo":"Temperatura demasiado alta","sig":"Aviso, no código: la temperatura interior ha subido tras un corte de luz o con la puerta abierta mucho tiempo.","pasos":["Cerrar la puerta y esperar a que baje la temperatura","Pulsar la tecla de alarma para silenciarla","Revisar si hay comida descongelada"],"sem":"verde","llamar":"Si no baja en un día sin corte de luz ni puerta abierta → compresor o circuito (nunca abrirlo).","aviso":1},{"id":"e01-congelador","cod":"E01 / E03 / E06 / E07","ap":"congelador","keys":["E01","E03","E06","E07","E1","E3","E6","E7"],"titulo":"Advertencia de sensor","sig":"Aviso de sensor de temperatura; E03 indica que el congelador no alcanza la temperatura.","pasos":["Comprobar si ha habido un corte de luz y que la puerta cierra bien","Si acaba de arrancar o se ha cargado mucho producto, esperar un día entero","Desactivar Frostmatic y reiniciar desde el cuadro 1 minuto"],"sem":"ambar","llamar":"Si persiste pasado un día → AEG indica solicitar la visita de un técnico."},{"id":"alarma-congelador","cod":"Alarma / temperatura parpadeando","ap":"congelador","keys":["ALARMA","PITA","PARPADEA"],"titulo":"Temperatura demasiado alta","sig":"Aviso, no código: la temperatura ha subido tras un corte de luz o con la puerta abierta.","pasos":["Cerrar la puerta y no abrirla hasta que baje la temperatura","Pulsar la tecla de alarma para silenciarla","Revisar si hay comida descongelada"],"sem":"verde","llamar":"Si no baja en un día sin causa → compresor o circuito (nunca abrirlo).","aviso":1},{"id":"f11-horno","cod":"F11 / F111 / F129","ap":"horno","keys":["F11","F111","F129"],"titulo":"Sonda de alimentos","sig":"La sonda térmica está mal conectada, averiada o su toma tiene un problema.","pasos":["Sacar la sonda y volver a enchufarla a fondo en su toma","Revisar que el cable de la sonda no está dañado","Apagar 30 segundos desde el cuadro eléctrico y probar sin la sonda"],"sem":"verde","llamar":"Sin sonda conectada sigue marcando F111 → conector o placa."},{"id":"f21-horno","cod":"F21","ap":"horno","keys":["F21"],"titulo":"Temperatura de arranque alta","sig":"El horno detecta demasiada temperatura al arrancar (por ejemplo, justo después de una pirólisis).","pasos":["Dejar enfriar el horno con la puerta cerrada","Apagar y volver a encender"],"sem":"ambar","llamar":"Si repite en frío → sonda NTC o relé."},{"id":"f136-horno","cod":"F136 / F138 / F192","ap":"horno","keys":["F136","F138","F192"],"titulo":"Sonda de temperatura o humedad","sig":"Sonda de temperatura del horno averiada (F136/F138) o humedad en la toma de la sonda de alimentos (F192).","pasos":["Con F192, secar la toma de la sonda con un paño y esperar","Apagar 30 segundos desde el cuadro y reiniciar"],"sem":"ambar","llamar":"Si repite → sonda de temperatura o placa."},{"id":"f-numero-horno","cod":"F + número (F2…F9, F101…)","ap":"horno","keys":["F2","F3","F4","F5","F6","F7","F8","F9"],"titulo":"Fallo interno","sig":"AEG agrupa cualquier F con número que no esté arriba como fallo interno que requiere visita; tras una tormenta suele ser pasajero.","pasos":["Cortar el automático del horno 30 segundos y volver a conectarlo"],"sem":"ambar","llamar":"Si vuelve tras el reinicio → llama con el número exacto del código."}];
var APARATOS={"lavadora":{"id":"lavadora","nombre":"Lavadora","art":"una lavadora","slug":"lavadora"},"lavavajillas":{"id":"lavavajillas","nombre":"Lavavajillas","art":"un lavavajillas","slug":"lavavajillas"},"frigorifico":{"id":"frigorifico","nombre":"Frigorífico","art":"un frigorífico","slug":"frigorifico"},"horno":{"id":"horno","nombre":"Horno","art":"un horno","slug":"horno"},"secadora":{"id":"secadora","nombre":"Secadora","art":"una secadora","slug":"secadora"},"lavasecadora":{"id":"lavasecadora","nombre":"Lavasecadora","art":"una lavasecadora","slug":"lavasecadora"},"congelador":{"id":"congelador","nombre":"Congelador","art":"un congelador","slug":"congelador"},"placa":{"id":"placa","nombre":"Placa de inducción","art":"una placa","slug":"placa"}};
  var REL = document.documentElement.getAttribute('data-rel') || '';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var wa = function (t) { return CONFIG.WA_BASE + encodeURIComponent(t); };
  var ico = function (id, cls) { return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- zona (memoria de sesión) */
  var Z = {
    get: function () { try { return sessionStorage.getItem('zona') || ''; } catch (e) { return ''; } },
    set: function (v) { try { v ? sessionStorage.setItem('zona', v) : sessionStorage.removeItem('zona'); } catch (e) { } }
  };
  if (document.body.getAttribute('data-zona')) Z.set(document.body.getAttribute('data-zona'));
  var zonaTxt = function () { return Z.get() || '[tu barrio o municipio]'; };


  /* ---------- barra inferior: solo cuando los CTA del hero no se ven */
  var barra = $('.barra');
  if (barra) {
    var heroCta = $('[data-hero-cta]');
    var setBarra = function (on) { barra.classList.toggle('on', on); document.body.classList.toggle('barra-on', on); };
    if (heroCta && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { setBarra(!es[0].isIntersecting && es[0].boundingClientRect.top < 0 || (!es[0].isIntersecting && window.scrollY > 300)); }, { threshold: 0.2 }).observe(heroCta);
    } else setBarra(true);
  }

  /* ---------- modal de llamada en escritorio */
  var esEscritorio = window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth >= 1024;
  var modal = $('#modal-tel');
  if (modal && esEscritorio) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      e.preventDefault(); modal.classList.add('on'); $('.cerrar', modal).focus();
    });
    $('.cerrar', modal).addEventListener('click', function () { modal.classList.remove('on'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('on'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('on'); });
    var cp = $('[data-copiar]', modal);
    if (cp) cp.addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText('641153922').then(function () { cp.textContent = 'Copiado: 641 153 922'; });
    });
  }

  /* ---------- vídeo del hero: solo 4G, en viewport, sin reduced-motion ni ahorro de datos */
  var v = $('video[data-src]');
  if (v) {
    var c = navigator.connection || {};
    var okRed = !c.saveData && (!c.effectiveType || c.effectiveType === '4g');
    if (window.innerWidth < 900 && v.getAttribute('data-src-m')) v.setAttribute('data-src', v.getAttribute('data-src-m'));
    if (okRed && !reduced && 'IntersectionObserver' in window) {
      var cargado = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) {
          if (!cargado) { cargado = true; v.src = v.getAttribute('data-src'); v.load(); v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true }); }
          v.play().catch(function () { });
        } else if (cargado) v.pause();
      }, { threshold: 0.1 }).observe(v);
    }
  }

  /* ---------- reveals */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* ---------- síntomas (subpáginas) */
  $$('.sint-b').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.nextElementSibling, on = b.getAttribute('aria-expanded') === 'true';
      $$('.sint-b', b.closest('.sint')).forEach(function (o) { o.setAttribute('aria-expanded', 'false'); o.nextElementSibling.classList.remove('on'); });
      if (!on) { b.setAttribute('aria-expanded', 'true'); p.classList.add('on'); }
    });
  });
  /* WhatsApp con zona en enlaces marcados */
  $$('a[data-wa]').forEach(function (a) {
    a.addEventListener('click', function () { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); });
    a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt()));
  });

  /* ================================================================ BUSCADOR */
  var APW = { lavasecadora: ['LAVASECADORA', 'LAVASECADORAS'], lavadora: ['LAVADORA', 'LAVADORAS'], lavavajillas: ['LAVAVAJILLAS', 'LAVAPLATOS'], congelador: ['CONGELADOR', 'CONGELADORES', 'ARCON'], frigorifico: ['FRIGORIFICO', 'FRIGO', 'NEVERA', 'COMBI', 'AMERICANO', 'FRIGORIFICOS'], secadora: ['SECADORA', 'SECADORAS'], horno: ['HORNO', 'HORNOS'], campana: ['CAMPANA', 'EXTRACTORA'], caldera: ['CALDERA', 'CONDENS', 'CALEFACCION'], calentador: ['CALENTADOR', 'TERMO', 'THERM'], 'aire-acondicionado': ['AIRE', 'ACONDICIONADO', 'SPLIT', 'CLIMA', 'CLIMATIZACION', 'CLIMATE'], placa: ['PLACA', 'INDUCCION', 'VITRO', 'VITROCERAMICA', 'ENCIMERA'] };
  function sinAcentos(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function parse(q) {
    var up = sinAcentos(q).toUpperCase(), ap = null;
    Object.keys(APW).forEach(function (k) { APW[k].forEach(function (w) { var re = new RegExp('\\b' + w + '\\b'); if (re.test(up)) { ap = ap || k; up = up.replace(re, ' '); } }); });
    var sinRelleno = up.replace(/\b(ERROR|CODIGO|CODE|DE|MI|LA|EL|MARCA|UN|UNA)\b/g, ' ');
    if (sinRelleno.trim()) up = sinRelleno; /* si la consulta es solo «dE» (código de puerta en LG), no se vacía */
    if (CONFIG.MARCA_RE) up = up.replace(CONFIG.MARCA_RE, ' ');
    var k = up.replace(/[\s\-\._:\/]/g, '');
    k = k.replace(/^O(?=\d)/, 'E').replace(/O(?=\d)/g, '0').replace(/(\d)O/g, '$10');
    if (/^\d+$/.test(k)) k = 'E' + k;
    var alt = CONFIG.F_ES_E && /^F\d/.test(k) ? k.replace(/^F/, 'E') : null;
    return { key: k, alt: alt, ap: ap, fIn: !!alt };
  }
  function buscar1(key, ap, prefijo) {
    return CODIGOS.filter(function (c) {
      if (ap && c.ap !== ap) return false;
      return c.keys.some(function (k) { return prefijo ? k.indexOf(key) === 0 : k === key; });
    });
  }
  function buscar(key, ap, prefijo, alt) {
    var r = buscar1(key, ap, prefijo);
    if (!r.length && alt) r = buscar1(alt, ap, prefijo);
    return r;
  }
  function semTxt(c) { return c.sem === 'verde' ? 'Puedes comprobarlo tú en 2 minutos' : 'Mejor llamar directamente'; }
  function textoWA(c, pasos) {
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var t = 'Hola, tengo ' + a.art + ' ' + CONFIG.MARCA + ' que marca ' + codigo + '. ';
    if (pasos && pasos.length) t += 'He probado: ' + pasos.join(', ').toLowerCase() + ' y sigue igual. ';
    return t + 'Estoy en ' + zonaTxt();
  }
  function renderFicha(c, opts) {
    opts = opts || {};
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var h = '<article class="ficha' + (c.sem === 'ambar' ? ' hot' : '') + '" data-id="' + c.id + '">';
    h += '<div class="ficha-h"><span class="ficha-cod">' + esc(c.cod) + '</span><span class="ficha-ap">' + ico(a.id) + esc(a.nombre) + ' <span class="marca">' + esc(CONFIG.MARCA) + '</span></span></div>';
    h += '<p class="ficha-t">' + esc(c.titulo) + '</p><p class="ficha-s">' + esc(c.sig) + '</p>';
    h += '<span class="sem sem-' + c.sem + '">' + semTxt(c) + '</span>';
    if (c.pasos.length) {
      h += '<ul class="chk" aria-label="Autocomprobación">' + c.pasos.map(function (p, i) { return '<li><label><input type="checkbox" data-paso="' + i + '"><span>' + esc(p) + '</span></label></li>'; }).join('') + '</ul>';
      h += '<div class="sigue" role="group" aria-label="Resultado"><p>¿Sigue marcando ' + esc(codigo) + '?</p><div class="g"><button type="button" class="si">Sí, sigue igual</button><button type="button" class="no">Se ha arreglado</button></div></div>';
    }
    h += '<div class="llamar-c' + (c.pasos.length ? '' : ' on') + '"><b>Cuándo llamar</b>' + esc(c.llamar) + '</div>';
    h += '<div class="ok-c">Nos alegramos. Si vuelve a marcarlo, aquí estamos. <a class="link" href="' + REL + a.slug + '/">Cómo cuidar tu ' + esc(a.nombre.toLowerCase()) + ' →</a></div>';
    h += '<div class="ficha-cta"><a class="btn btn-wa" data-cta-wa href="' + wa(textoWA(c, [])) + '" target="_blank" rel="noopener">' + ico('wa') + 'WhatsApp con el código</a>';
    h += '<a class="btn btn-amber" data-cta-tel href="' + CONFIG.TEL_HREF + '">' + ico('tel') + 'Llamar · ' + CONFIG.TEL + '</a></div>';
    h += '<div class="ficha-links"><a class="link" href="' + REL + a.slug + '/">Ver todo sobre ' + esc(a.art) + ' ' + esc(CONFIG.MARCA) + ' →</a><button type="button" data-copy="' + c.id + '">Copiar enlace a este código</button></div>';
    h += '<p class="ficha-fin">Presupuesto por escrito en casa antes de tocar nada. Si tu aparato tiene menos de 3 años, tiene garantía legal del fabricante: ' + CONFIG.SAT_TXT + '</p>';
    return h + '</article>';
  }
  function bindFicha(el) {
    var id = el.getAttribute('data-id'), c = CODIGOS.filter(function (x) { return x.id === id; })[0];
    if (!c || el.__b) return; el.__b = true;
    var chk = $$('input[type=checkbox]', el), sigue = $('.sigue', el), llamar = $('.llamar-c', el), ok = $('.ok-c', el);
    var bWa = $('[data-cta-wa]', el), bTel = $('[data-cta-tel]', el);
    var codigo = c.cod.split('/')[0].trim();
    var pasos = function () { return chk.filter(function (i) { return i.checked; }).map(function (i) { return i.nextElementSibling.textContent; }); };
    var refresca = function () { bWa.href = wa(textoWA(c, pasos())); };
    chk.forEach(function (i) {
      i.addEventListener('change', function () {
        refresca();
        if (chk.every(function (x) { return x.checked; })) { sigue.classList.add('on'); } else { sigue.classList.remove('on'); }
      });
    });
    if (sigue) {
      $('.si', sigue).addEventListener('click', function () {
        llamar.classList.add('on'); ok.classList.remove('on'); el.classList.add('hot'); refresca();
        $('.si', sigue).setAttribute('aria-pressed', 'true'); $('.no', sigue).removeAttribute('aria-pressed');
      });
      $('.no', sigue).addEventListener('click', function () {
        ok.classList.add('on'); llamar.classList.remove('on'); el.classList.remove('hot');
        $('.no', sigue).setAttribute('aria-pressed', 'true'); $('.si', sigue).removeAttribute('aria-pressed');
      });
    }
    var cp = $('[data-copy]', el);
    if (cp) cp.addEventListener('click', function () {
      var url = new URL(REL + 'codigos-error/#' + c.id, location.href).href;
      var done = function () { cp.textContent = 'Enlace copiado'; setTimeout(function () { cp.textContent = 'Copiar enlace a este código'; }, 2500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copia el enlace:', url); });
      else prompt('Copia el enlace:', url);
    });
    refresca();
  }
  $$('.ficha[data-id]').forEach(bindFicha);

  function initBus(root) {
    var input = $('input', root), sug = $('.bus-sug', root), res = $('.bus-res', root), x = $('.bus-x', root);
    var apFijo = root.getAttribute('data-ap') || null, ap = apFijo, sel = -1, items = [];
    var chips = $$('.chip-btn[data-ap]', root);
    /* atajos «más buscados»: al elegir un aparato solo se ofrecen SUS códigos (nunca los de otro aparato) */
    var top = $('.bus-top', root), topHTML = top ? top.innerHTML : '';
    function bindAtajos() {
      $$('[data-cod]', root).forEach(function (b) { if (b._ok) return; b._ok = 1; b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-cod'); })[0]; if (!c) return; if (ap && c.ap !== ap) { setAp(c.ap); } input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    function pintaAtajos(k) {
      if (!top || apFijo) return;
      /* defensa: cualquier atajo de código que haya quedado fuera de .bus-top se elimina al elegir aparato */
      $$('[data-cod]', root).forEach(function (b) { if (!b.closest('.bus-top') && !b.closest('.bus-res')) { var li = b.closest('li'); (li || b).remove(); } });
      if (!k) { top.innerHTML = topHTML; bindAtajos(); return; }
      var a = APARATOS[k], mios = CODIGOS.filter(function (c) { return c.ap === k && !c.aviso; }).slice(0, 8), av = CODIGOS.filter(function (c) { return c.ap === k && c.aviso; });
      if (!mios.length && !av.length) { top.innerHTML = '<span class="bus-top-nota">' + esc(a.nombre) + ': sin códigos verificados de ' + esc(CONFIG.MARCA) + '. Dinos el síntoma y te decimos qué puede ser.</span>'; return; }
      top.innerHTML = 'Códigos de ' + esc(a.nombre.toLowerCase()) + ': <ul class="chips">' + mios.concat(av).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-cod="' + c.id + '">' + esc(c.cod.split('/')[0]) + '</button></li>'; }).join('') + '</ul>';
      bindAtajos();
    }
    var setAp = function (k) {
      ap = k; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === k ? 'true' : 'false'); });
      pintaAtajos(k);
      /* al cambiar de aparato se empieza de cero: el código anterior no se arrastra */
      input.value = ''; x.classList.remove('on'); limpia(); if (res) res.innerHTML = '';
    };
    chips.forEach(function (b) { b.addEventListener('click', function () { setAp(ap === b.getAttribute('data-ap') ? null : b.getAttribute('data-ap')); if (b.getAttribute('data-ap') === 'placa' && placaSinCodigos()) placa(); }); });
    bindAtajos();
    function limpia() { sug.classList.remove('on'); sug.innerHTML = ''; sel = -1; items = []; input.setAttribute('aria-expanded', 'false'); }
    function muestra(c) {
      if (ap && c.ap !== ap && !apFijo) { ap = c.ap; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === c.ap ? 'true' : 'false'); }); pintaAtajos(c.ap); }
      limpia(); res.innerHTML = renderFicha(c); bindFicha($('.ficha', res));
      if (!reduced && root.getAttribute('data-scroll') !== 'no') setTimeout(function () { res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
    }
    function ambiguo(list, key) {
      res.innerHTML = '<div class="bus-amb"><p>' + esc(key) + ' existe en varios aparatos. ¿En cuál?</p><div class="g">' +
        list.map(function (c) { return '<button type="button" data-id="' + c.id + '">' + ico(c.ap) + esc(APARATOS[c.ap].nombre) + '</button>'; }).join('') + '</div></div>';
      $$('button', res).forEach(function (b) { b.addEventListener('click', function () { muestra(CODIGOS.filter(function (c) { return c.id === b.getAttribute('data-id'); })[0]); }); });
    }
    function nada(raw, key, apq, pre) {
      var a = apq ? APARATOS[apq] : null, art = a ? a.art : 'mi aparato';
      var quiza = (pre && pre.length) ? '<p>¿Querías decir…?</p><ul class="chips" style="margin-bottom:14px">' + pre.slice(0, 5).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-id="' + c.id + '">' + ico(c.ap) + c.cod.split('/')[0] + ' · ' + esc(APARATOS[c.ap].nombre) + '</button></li>'; }).join('') + '</ul>' : '';
      var t = 'Hola, ' + (a ? 'tengo ' + art + ' ' + CONFIG.MARCA + ' que marca ' : 'mi aparato ' + CONFIG.MARCA + ' marca ') + key + '. ¿Me decís qué puede ser? Estoy en ' + zonaTxt();
      res.innerHTML = '<div class="bus-no"><p>No tenemos <strong class="mono">' + esc(key) + '</strong>' + (a ? ' en ' + esc(a.nombre.toLowerCase()) : '') + ' verificado con documentación de <span class="marca">' + esc(CONFIG.MARCA) + '</span> y preferimos no inventarlo. Escríbenoslo igual y te decimos qué puede ser.</p>' + quiza +
        '<a class="btn btn-wa" href="' + wa(t) + '" target="_blank" rel="noopener">' + ico('wa') + 'Preguntar por WhatsApp</a>' +
        '<p class="ficha-fin">Manda también una foto de la etiqueta ' + esc(CONFIG.ETIQUETA) + ' (en la puerta o el marco del aparato): así te contestamos con el modelo exacto. <a class="link" href="' + REL + 'codigos-error/#enr">Dónde está el ' + esc(CONFIG.ETIQUETA) + ' →</a></p></div>';
      $$('button[data-id]', res).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-id'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    /* la placa solo va «por síntomas» si la marca no publica códigos verificados para ella (Siemens sí los tiene) */
    function placaSinCodigos() { return !!APARATOS.placa && !CODIGOS.some(function (c) { return c.ap === 'placa'; }); }
    function placa() {
      limpia();
      var ss = ['no detecta la olla', 'parpadea', 'se apaga por temperatura'];
      res.innerHTML = '<div class="bus-no"><p>Las placas <span class="marca">' + esc(CONFIG.MARCA) + '</span> avisan por símbolos y parpadeos, no por códigos verificables: dinos el síntoma.</p><ul class="chips">' +
        ss.map(function (s) { return '<li><a class="chip chip-btn" target="_blank" rel="noopener" href="' + wa('Hola, tengo una placa ' + CONFIG.MARCA + ' que ' + s + '. Estoy en ' + zonaTxt()) + '">' + ico('wa') + esc(s) + '</a></li>'; }).join('') +
        '</ul><p class="ficha-fin mt16"><a class="link" href="' + REL + 'placa/">Placa de inducción: por síntomas, no por códigos →</a></p></div>';
    }
    function go(raw) {
      var p = parse(raw), apq = ap || p.ap;
      if (apq === 'placa' && placaSinCodigos()) { placa(); return; }
      if (!p.key && apq) { var av = CODIGOS.filter(function (c) { return c.ap === apq && c.aviso; }); if (av.length === 1) return muestra(av[0]); }
      if (!p.key) { res.innerHTML = ''; limpia(); return; }
      var ex = buscar(p.key, apq, false, p.alt);
      if (ex.length === 1) return muestra(ex[0]);
      if (ex.length > 1) { limpia(); return ambiguo(ex, p.key); }
      var pre = buscar(p.key, apq, true, p.alt);
      if (pre.length === 1 && p.key.length < 3) return muestra(pre[0]);
      limpia(); nada(raw, p.key, apq, pre);
    }
    function sugiere() {
      var raw = input.value, p = parse(raw), apq = ap || p.ap;
      x.classList.toggle('on', !!raw);
      if (!p.key || p.key.length < 2 || (apq === 'placa' && placaSinCodigos())) { limpia(); return; }
      var seen = {}, list = buscar(p.key, apq, true, p.alt).filter(function (c) { return !seen[c.id] && (seen[c.id] = 1); }).slice(0, 5);
      var ex = buscar(p.key, apq, false, p.alt); if (ex.length) list = ex.concat(list.filter(function (c) { return ex.indexOf(c) < 0; })).slice(0, 5);
      if (!list.length) { limpia(); return; }
      items = list; sel = -1;
      sug.innerHTML = list.map(function (c, i) {
        var k = c.keys.filter(function (y) { return y.indexOf(p.key) === 0 || (p.alt && y.indexOf(p.alt) === 0); })[0] || c.cod;
        var disp = c.cod; if (c.cod.indexOf(k) < 0 && c.cod.indexOf(k.replace(/^E/, 'F')) < 0) disp = k + ' (' + c.cod + ')';
        var m = disp.indexOf(p.key) >= 0 ? disp.replace(p.key, '<mark>' + p.key + '</mark>') : (p.alt ? disp.replace(p.alt, '<mark>' + p.alt + '</mark>') : disp);
        return '<li role="option" id="' + root.id + '-o' + i + '" data-id="' + c.id + '"><span class="mono">' + m + '</span><span class="ap">' + esc(APARATOS[c.ap].nombre) + '</span><span>' + esc(c.titulo) + '</span></li>';
      }).join('');
      if (p.fIn && !buscar1(p.key, apq, true).length) sug.innerHTML += '<li style="cursor:default;color:#55636F;font-size:12px">En ' + esc(CONFIG.MARCA) + ', F y E son el mismo código (F18 = E18)</li>';
      sug.classList.add('on'); input.setAttribute('aria-expanded', 'true');
      $$('li[data-id]', sug).forEach(function (li) { li.addEventListener('mousedown', function (e) { e.preventDefault(); input.value = li.querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === li.getAttribute('data-id'); })[0]); }); });
    }
    input.addEventListener('input', sugiere);
    input.addEventListener('keydown', function (e) {
      var lis = $$('li[data-id]', sug);
      if (e.key === 'ArrowDown' && lis.length) { e.preventDefault(); sel = (sel + 1) % lis.length; }
      else if (e.key === 'ArrowUp' && lis.length) { e.preventDefault(); sel = (sel - 1 + lis.length) % lis.length; }
      else if (e.key === 'Enter') { e.preventDefault(); if (sel >= 0 && lis[sel]) { input.value = lis[sel].querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === lis[sel].getAttribute('data-id'); })[0]); } else go(input.value); return; }
      else if (e.key === 'Escape') { limpia(); return; }
      else return;
      lis.forEach(function (li, i) { li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
      input.setAttribute('aria-activedescendant', sel >= 0 ? lis[sel].id : '');
    });
    input.addEventListener('blur', function () { setTimeout(limpia, 150); });
    x.addEventListener('click', function () { input.value = ''; res.innerHTML = ''; limpia(); x.classList.remove('on'); input.focus(); });
    root.__go = function (q) { input.value = q; go(q); };
  }
  $$('.bus').forEach(initBus);

  /* ---------- hub: abrir ancla y hacer scroll */
  function abreAncla() {
    var h = location.hash.replace('#', ''); if (!h) return;
    var d = document.getElementById(h);
    if (d && d.tagName === 'DETAILS') { d.open = true; setTimeout(function () { d.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }, 60); }
  }
  abreAncla(); window.addEventListener('hashchange', abreAncla);


  /* ---------- desplegable de aparatos (cabecera) */
  var dd = $('.dd');
  if (dd) {
    var ddb = $('.dd-b', dd);
    ddb.addEventListener('click', function () { var on = dd.classList.toggle('on'); ddb.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
  }

  /* ================================================================ MAPA de zonas */
  var mapa = $('.mapa');
  if (mapa) {
    var info = $('.mapa-info', mapa), zs = $$('.z', mapa);
    var pinta = function (z) {
      zs.forEach(function (o) { o.classList.toggle('on', o === z); });
      var n = z.getAttribute('data-nombre'), href = z.getAttribute('data-href'), km = z.getAttribute('data-km'); Z.set(n);
      var dist = km === 'capital' ? 'Valladolid capital' : 'a ' + km + ' km del centro de Valladolid, dentro de nuestro radio de 20 km';
      info.innerHTML = '<p class="kicker">Cubrimos ' + esc(n) + ' · ' + dist + '</p><h3>Llama al <a class="link" href="' + CONFIG.TEL_HREF + '">' + CONFIG.TEL + '</a></h3><p>' + esc(z.getAttribute('data-txt') || '') + '</p>' +
        '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ' + n) + '">' + ico('wa') + 'WhatsApp desde ' + esc(n) + '</a>' +
        (href ? '<a class="btn btn-ghost btn-sm" href="' + href + '">Ver ' + esc(n) + ' →</a>' : '<a class="btn btn-ghost btn-sm" href="' + CONFIG.TEL_HREF + '">Llamar · ' + CONFIG.TEL + '</a>') + '</div>';
    };
    zs.forEach(function (z) { z.addEventListener('click', function () { pinta(z); }); z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pinta(z); } }); });
    /* el anillo de 20 km también responde: explica el área de actuación */
    var an = $('.anillo-20', mapa);
    if (an) {
      var radio = function () {
        zs.forEach(function (o) { o.classList.remove('on'); }); an.classList.add('on');
        info.innerHTML = '<p class="kicker">Área de actuación</p><h3>' + an.getAttribute('data-radio') + ' km a la redonda de Valladolid</h3><p>Trabajamos únicamente dentro de este círculo: Valladolid capital y los municipios a menos de 20 km del centro, todos con el mismo precio de visita: ' + CONFIG.PRECIO + ' IVA incl., descontados si reparas. Fuera del radio no damos servicio.</p>' +
          '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ') + '">' + ico('wa') + 'WhatsApp</a><a class="btn btn-ghost btn-sm" href="' + CONFIG.TEL_HREF + '">Llamar · ' + CONFIG.TEL + '</a></div>';
      };
      an.addEventListener('click', radio); an.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); radio(); } });
      zs.forEach(function (z) { z.addEventListener('click', function () { an.classList.remove('on'); }); });
    }
  }
})();
