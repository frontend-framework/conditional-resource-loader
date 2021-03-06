import mergeResources from './mergeResources';
import createResource from '../builders/ResourceBuilder';

describe('#mergeResources', () => {
    test('returns empty array for undefined', () => {
        const merged = mergeResources();
        expect(merged).toHaveLength(0);
    });

    test('returns empty array for empty array', () => {
        const merged = mergeResources([]);
        expect(merged).toHaveLength(0);
    });

    test('returns same array if all resources are different', () => {
        const merged = mergeResources([
            createResource().withPath('path1').build(),
            createResource().withPath('path2').build()
        ]);
        expect(merged).toHaveLength(2);
    });

    test('returns one resource for two same paths', () => {
        const merged = mergeResources([
            createResource().withPath('path1').build(),
            createResource().withPath('path1').build()
        ]);
        expect(merged).toHaveLength(1);
    });

    test('returns one resource with both dependencies', () => {
        const merged = mergeResources([
            createResource().withPath('path1').addDependency('dependency1').build(),
            createResource().withPath('path1').addDependency('dependency2').build()
        ]);
        expect(merged[0].dependencyPaths).toHaveLength(2);
    });

    test('returns one resource with one dependency if both are equal', () => {
        const merged = mergeResources([
            createResource().withPath('path1').addDependency('dependency1').build(),
            createResource().withPath('path1').addDependency('dependency1').build()
        ]);
        expect(merged[0].dependencyPaths).toHaveLength(1);
    });

    test('returns one resource with both elements', () => {
        const element1 = document.createElement('h1');
        const element2 = document.createElement('h2');
        const merged = mergeResources([
            createResource().withPath('path1').addElement(element1).build(),
            createResource().withPath('path1').addElement(element2).build()
        ]);
        expect(merged[0].elements).toHaveLength(2);
    });

    test('returns two resources with one element if both are equal', () => {
        const element1 = document.createElement('h1');

        const merged = mergeResources([
            createResource().withPath('path1').addElement(element1).build(),
            createResource().withPath('path2').addElement(element1).build()
        ]);

        expect(merged).toHaveLength(2);
        expect(merged[0].elements).toHaveLength(1);
        expect(merged[1].elements).toHaveLength(1);
    });
});
