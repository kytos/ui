# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SPHINXPROJ    = kytosui
SOURCEDIR     = source
BUILDDIR      = build
COMPONENTS_FOLDER = source/components

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile dirhtml

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

dirhtml:
	make components
	@$(SPHINXBUILD) "$(SOURCEDIR)" "$(BUILDDIR)/dirhtml" $(SPHINXOPTS) $(O)
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/dirhtml."

components:
	@echo "Generating kytos components documentation"
	node ./docgen.js

clean:
	rm $(BUILDDIR) $(COMPONENTS_FOLDER) -fr
	@echo "All files from $(BUILDDIR) and $(COMPONENTS_FOLDER) was removed."

livehtml:
	make components
	sphinx-autobuild --ignore "*.swp" \
        --ignore "*.pdf" \
        --ignore "*.log" \
        --ignore "*.out" \
        --ignore "*.toc" \
        --ignore "*.aux" \
        --ignore "*.idx" \
        --ignore "*.ind" \
        --ignore "*.ilg" \
        --ignore "*.tex" \
        --ignore "*.*~" \
        source $(BUILDDIR)/dirhtml
