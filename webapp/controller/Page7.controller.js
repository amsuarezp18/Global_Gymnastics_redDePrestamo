sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.globalGym.controller.Page7", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App60a5ae41f6baa2192b2067f0";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype" && prop.includes("Set")) {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		_onButtonPress: function() {
			return new Promise(function(fnResolve) {
				sap.m.MessageBox.confirm("Su solicitud ha sido creada exitosamente, pronto lo contactaremos para hacer entrega del equipo solicitado", {
					title: "Solicitud creada exitosamente",
					actions: ["Aceptar", "Cerrar"],
					onClose: function(sActionClicked) {
						fnResolve(sActionClicked === "Aceptar");
					}
				});
			}).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err);
				}
			});

		},
		_onButtonPress1: function() {
			return new Promise(function(fnResolve) {
				var aChangedEntitiesPath, oChangedBindingContext;
				var oModel = this.oModel;
				if (oModel && oModel.hasPendingChanges()) {
					aChangedEntitiesPath = Object.keys(oModel.mChangedEntities);

					for (var j = 0; j < aChangedEntitiesPath.length; j++) {
						oChangedBindingContext = oModel.getContext("/" + aChangedEntitiesPath[j]);
						if (oChangedBindingContext && oChangedBindingContext.bCreated) {
							oModel.deleteCreatedEntry(oChangedBindingContext);
						}
					}
					oModel.resetChanges();
				}
				fnResolve();
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Page7").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			this.oModel = this.getOwnerComponent().getModel();

		}
	});
}, /* bExport= */ true);
