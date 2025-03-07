import React, { createContext, useState } from 'react'

export const editSkillContext = createContext()
export const addSkillRatingContext = createContext()
export const editSkillRatingContext = createContext()
export const addSkillCategoryContext = createContext()
export const editSkillCategoryContext = createContext()

function ContextApi({ children }) {
    const [editSkillResponse, setEditSkillResponse] = useState("")
    const [addSkillRatingResponse, setAddSkillRatingResponse] = useState("")
    const [editSkillRatingResponse, setEditSkillRatingResponse] = useState("")
    const [addSkillCategoryResponse, setAddSkillCategoryResponse] = useState("")
    const [editSkillCategoryResponse, setEditSkillCategoryResponse] = useState("")

    return (
        <editSkillContext.Provider value={{ editSkillResponse, setEditSkillResponse }}>
            <addSkillRatingContext.Provider value={{ addSkillRatingResponse, setAddSkillRatingResponse }}>
                <editSkillContext.Provider value={{ editSkillRatingResponse, setEditSkillRatingResponse }}>
                    <addSkillCategoryContext.Provider value={{ addSkillCategoryResponse, setAddSkillCategoryResponse }}>
                        <editSkillCategoryContext.Provider value={{editSkillCategoryResponse, setEditSkillCategoryResponse}}>
                            {children}
                        </editSkillCategoryContext.Provider>
                    </addSkillCategoryContext.Provider>
                </editSkillContext.Provider>
            </addSkillRatingContext.Provider>
        </editSkillContext.Provider>
    )
}

export default ContextApi