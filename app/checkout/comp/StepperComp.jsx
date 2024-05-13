"use client";
import { Step, Stepper } from "react-form-stepper";
const StepperComp = (props) => {
  const { steps } = props;
  return (
    <Stepper activeStep={steps}>
      <Step label="Vos informations" />
      <Step label="Paiement" />
      <Step label="Fin de l'operation" />
    </Stepper>
  );
};

export default StepperComp;
