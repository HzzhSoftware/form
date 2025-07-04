"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Form } from "@hzzhsoftware/types-form";

type FormContextType = {
    form: Form;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormContextProvider({ form, children }: { form: Form, children: React.ReactNode }) {
    return (
        <FormContext.Provider value={{ form }}>
            {children}
        </FormContext.Provider>
    )
}

export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormContextProvider");
    }
    return context;
}
