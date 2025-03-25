
export function getMappedResumeTemplates() {

    return ResumeTemplateIDSchema.options.map((templateID) => {
        return {
            id: templateID,
            image: `/resume-templates/${templateID}.png`,
        };
    });
}

