# CLAUDE.md

This project is a podcast creation workflow that converts audio files to transcripts and generates show notes.

## Project Structure

```
new_project/
├── .claude/
│   └── settings.json          # Agent configuration
├── memory/                    # Project memories (facts, guidance)
├── src/
│   ├── __init__.py
│   ├── main.py                # Entry point
│   ├── transcript.py          # Transcript generation logic
│   └── show_notes.py          # Show notes generation logic
├── tests/
│   ├── __init__.py
│   ├── test_transcript.py
│   └── test_show_notes.py
├── .gitignore
├── poetry.lock
├── pyproject.toml
└── README.md
```

## Key Files

- **`src/main.py`**: Entry point that orchestrates the workflow
- **`src/transcript.py`**: Handles audio-to-text transcription (currently uses Deepgram API)
- **`src/show_notes.py`**: Generates show notes from transcripts
- **`memory/`**: Contains project context, guidance, and facts for Claude

## Workflow

1. Add audio files to the project directory
2. Run the workflow to generate transcripts
3. Generate show notes from transcripts
4. Review and publish

## Common Tasks

- **Add audio**: Place `.mp3`, `.wav`, or `.m4a` files in the project directory
- **Generate transcript**: Run the workflow with the audio file
- **Generate show notes**: Run the show notes generation step
- **Edit transcript**: Use the transcript file to manually edit if needed

## Memory System

The `memory/` directory contains:
- **User facts**: Your role, expertise, preferences
- **Feedback**: Guidance on how to work (corrections, confirmed approaches)
- **Project context**: Goals, constraints, non-obvious details
- **Reference**: External links, dashboards, tickets

Use `[[memory-name]]` to link related memories.

## Tools

- **Write/Edit**: Create or modify files in the project
- **ExecuteCode**: Run Python code in the Jupyter kernel
- **Workflow**: Run predefined workflows (research, code review, etc.)

## Notes

- This project uses Poetry for dependency management
- Transcripts are generated using the Deepgram API
- Show notes are generated from transcripts
- The workflow is designed to be iterative and editable
